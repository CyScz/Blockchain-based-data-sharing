import * as Path from 'path';
import * as crypto from 'crypto'
import fs from 'fs';
import * as ipfs from './controller/ipfs.js';
import * as hl from './controller/hyperledger.js';
import {getDateTimeString} from './utils/dateUtils.js';
import {getSizeFromB, unitSize} from './utils/sizeUtils.js';
import log from './utils/fileLog.js';

const splitSizes: number[] = [.1, .2, .3, .4, .5, .7, .8, .9]
const testFilePath: string = Path.resolve('.', 'testFile.bin');

const resultsFileName = 'results_' + getDateTimeString(new Date(Date.now())) + '_'
    + (Math.floor(getSizeFromB(fs.statSync(testFilePath).size, unitSize.MB))).toString() + 'MB.csv';

// csv header
log(resultsFileName, 'split,totalSizeB,ipfsSize,ipfsDuration,hlSize,hlDuration\r\n');

function getHash(buffer: Buffer): string {
    const hash = crypto.createHash('md5');
    hash.update(buffer);
    return hash.digest('hex');
}

async function main(): Promise<void> {
    for (const splitSize of splitSizes) {
        const startTime = Date.now()
        let ipfsEndTime: number;
        let hyperledgerEndTime: number;

        const fileBuffer: Buffer = fs.readFileSync(testFilePath);
        const fileSize: number = fs.statSync(testFilePath).size

        const onChainData: Buffer = fileBuffer.subarray(0, fileSize * splitSize); // 0 >> n
        const onChainSize_base64 = Buffer.from(onChainData.toString('base64'));
        const offChainData: Buffer = fileBuffer.subarray(fileSize * splitSize); // n >> end
        const offChainSize_base64 = Buffer.from(offChainData.toString('base64'))

        await ipfs.addFile(Path.basename(testFilePath), offChainData)
            .then(res => {
                ipfsEndTime = Date.now()
                console.log(`Split: ${splitSize}, IPFS duration: ${ipfsEndTime - startTime} ms`);

                hl.addAsset({
                    ID: startTime.toString(),
                    Filename: Path.basename(testFilePath),
                    Size: fileSize,
                    Hash: getHash(fileBuffer),
                    Sender: 'application-gateway-typescript',
                    SplitRatio: splitSize,
                    ChunkAHash: getHash(onChainData),
                    ChunkAData: onChainData.toString('base64'),
                    ChunkBHash: getHash(offChainData),
                    ChunkBIpfsCid: res.toString()
                })
                    .then(_ => {
                        hyperledgerEndTime = Date.now();
                        console.info(`Split: ${splitSize} Hyperledger duration: ${hyperledgerEndTime - ipfsEndTime} ms`);
                        console.info(`Split: ${splitSize} Total duration: ${hyperledgerEndTime - startTime} ms`);
                        log(resultsFileName, `${splitSize},${fileSize},${offChainSize_base64},${ipfsEndTime - startTime},${onChainSize_base64},${hyperledgerEndTime - ipfsEndTime}\r\n`);
                    });
            });
    }

}

main()
    .catch(error => {
        console.error('******** FAILED to run the application:', error);
        process.exitCode = 1;
    });
