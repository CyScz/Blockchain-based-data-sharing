/**
 * multi_async : Processes all files at once, splits a file with constant ratio
 * Script does NOT wait until the file upload completes before processing next file ->> unordered
 *
 * This node app takes 3 parameters (example usage : npm run multi-sync 10 20 50)
 *  - quantity :  number of files to be generated
 *  - filesize :  size of the file in MB
 *  - splitSize : ratio (e.g. 10 = 10% on-chain)
 */

import * as Path from 'path';
import * as crypto from 'crypto'
import fs from 'fs';
import {exec} from 'child_process'
import {promisify} from 'util';
import * as ipfs from './controller/ipfs.js';
import * as hl from './controller/hyperledger.js';
import {getDateTimeString, getTimeWithMs} from './utils/date.js';
import log from './utils/logfile.js';

const execPromise = promisify(exec);

let quantity = 10;
let fileSize = 10;
let splitSize = .1;
const args = process.argv.slice(2);

if (args.length > 0) {
    quantity = Number.parseInt(args[0]);
    fileSize = Number.parseInt(args[1]);
    splitSize = Number.parseInt(args[2]) / 100;
    console.log(`filesize: ${fileSize}, quantity: ${quantity}, splitSize: ${splitSize}`);
}

const resultsFileName = 'results_' + getDateTimeString(new Date(Date.now())) + '_multi_async.csv';

// csv header
log(resultsFileName, 'File,Split,Total size (B),Off-chain size (B),Off-chain start time,Off-chain end time,Off-chain Duration (ms),On-chain size (B),On-chain start time,On-chain end time,On-chain duration (ms)\r\n');

function getHash(buffer: Buffer): string {
    const hash = crypto.createHash('md5');
    hash.update(buffer);
    return hash.digest('hex');
}

async function clearFiles(): Promise<void> {
    console.log('Clearing old files');
    await execPromise('rm ./files/*.bin || true')
}

async function generateFiles(size: number, quantity: number): Promise<void> {
    await clearFiles()
    console.log(`Generating ${quantity} test file(s) of ${size}MB`)
    await execPromise(`./generateFile.sh ${quantity} ${size} ./files`);
}

async function runTests(quantity: number, splitSize: number): Promise<void> {
    await generateFiles(fileSize, quantity);

    for (let i = 0; i < quantity; i++) {
        console.log(`processing file ${i}`)

        let offChainEndTime: number;
        let onChainEndTime: number;

        const testFilePath: string = Path.resolve('.', 'files', `testFile${i}.bin`);
        const fileSize: number = fs.statSync(testFilePath).size;
        const fileBuffer: Buffer = fs.readFileSync(testFilePath);

        // split file
        const onChainData: Buffer = fileBuffer.subarray(0, fileSize * splitSize); // 0 >> n
        const onChainSize_base64 = Buffer.from(onChainData.toString('base64')).byteLength;
        const offChainData: Buffer = fileBuffer.subarray(fileSize * splitSize); // n >> end
        const offChainSize_base64 = Buffer.from(offChainData.toString('base64')).byteLength;

        const startTime = Date.now()
        ipfs.addFile(Path.basename(testFilePath), offChainData)
            .then(res => {
                offChainEndTime = Date.now()
                console.log(`File: ${i}, Split: ${splitSize}, IPFS duration: ${offChainEndTime - startTime} ms`);

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
                        console.info(`File: ${i}, Split: ${splitSize} Hyperledger duration: ${onChainEndTime - offChainEndTime} ms`);
                        console.info(`File: ${i}, Split: ${splitSize} Total duration: ${onChainEndTime - startTime} ms`);
                        log(resultsFileName, `${i},${splitSize},${fileSize},${offChainSize_base64},${getTimeWithMs(new Date(startTime))},${getTimeWithMs(new Date(offChainEndTime))},${offChainEndTime - startTime},${onChainSize_base64},${getTimeWithMs(new Date(offChainEndTime))},${getTimeWithMs(new Date(onChainEndTime))},${onChainEndTime - offChainEndTime}\r\n`);
                    });
            });
    }
}

async function main(): Promise<void> {
    await runTests(quantity, splitSize);
}

main()
    .catch(error => {
        console.error('******** FAILED to run the application:', error);
        process.exitCode = 1;
    });
