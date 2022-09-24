import * as Path from 'path';
import * as crypto from 'crypto'
import fs from 'fs';
import * as ipfs from './controller/ipfs.js';
import * as hl from './controller/hyperledger.js';
import {getDateTimeString, getTimeWithMs} from './utils/dateUtils.js';
import {getSizeFromB, unitSize} from './utils/sizeUtils.js';
import log from './utils/fileLog.js';

const splitSizes: number[] = [.1, .2, .3, .4, .5, .7, .8, .9]
const testFilePath: string = Path.resolve('.', 'testFile.bin');

const resultsFileName = 'results_' + getDateTimeString(new Date(Date.now())) + '_'
    + (Math.floor(getSizeFromB(fs.statSync(testFilePath).size, unitSize.MB))).toString() + 'MB.csv';

// csv header
log(resultsFileName, 'Split,Total size (B),Off-chain size (B),Off-chain start time,Off-chain end time,Off-chain Duration (ms),On-chain size (B),On-chain start time,On-chain end time,On-chain duration (ms)\r\n');

function getHash(buffer: Buffer): string {
    const hash = crypto.createHash('md5');
    hash.update(buffer);
    return hash.digest('hex');
}

async function main(): Promise<void> {
    for (const splitSize of splitSizes) {
        const startTime = Date.now()
        let offChainEndTime: number;
        let onChainEndTime: number;

        const fileSize: number = fs.statSync(testFilePath).size;
        const fileBuffer: Buffer = fs.readFileSync(testFilePath);

        const onChainData: Buffer = fileBuffer.subarray(0, fileSize * splitSize); // 0 >> n
        const onChainSize_base64 = Buffer.from(onChainData.toString('base64')).byteLength;
        const offChainData: Buffer = fileBuffer.subarray(fileSize * splitSize); // n >> end
        const offChainSize_base64 = Buffer.from(offChainData.toString('base64')).byteLength;

        await ipfs.addFile(Path.basename(testFilePath), offChainData)
            .then(res => {
                offChainEndTime = Date.now()
                console.log(`Split: ${splitSize}, IPFS duration: ${offChainEndTime - startTime} ms`);

                hl.addAsset({
                    ID: startTime.toString(),
                    Filename: Path.basename(testFilePath),
                    Size: fileSize,
                    Hash: getHash(fileBuffer),
                    Sender: 'application-gateway-typescript',
                    SplitRatio: splitSize,
                    OnChainHash: getHash(onChainData),
                    OnChainData: onChainData.toString('base64'),
                    OffChainHash: getHash(offChainData),
                    OffChainIpfsCid: res.toString()
                })
                    .then(_ => {
                        onChainEndTime = Date.now();
                        console.info(`Split: ${splitSize} Hyperledger duration: ${onChainEndTime - offChainEndTime} ms`);
                        console.info(`Split: ${splitSize} Total duration: ${onChainEndTime - startTime} ms`);
                        log(resultsFileName, `${splitSize},${fileSize},${offChainSize_base64},${getTimeWithMs(new Date(startTime))},${getTimeWithMs(new Date(offChainEndTime))},${offChainEndTime - startTime},${onChainSize_base64},${getTimeWithMs(new Date(offChainEndTime))},${getTimeWithMs(new Date(onChainEndTime))},${onChainEndTime - offChainEndTime}\r\n`);
                    });
            });
    }
}

main()
    .catch(error => {
        console.error('******** FAILED to run the application:', error);
        process.exitCode = 1;
    });
