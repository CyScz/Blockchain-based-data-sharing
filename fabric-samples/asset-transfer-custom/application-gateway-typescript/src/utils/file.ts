import fs from 'fs';
import crypto from 'crypto';

const unitSize = {
    B: 1,
    KB: 1 * 1024,
    MB: 1 * 1024 * 1000,
    GB: 1 * 1024 * 1000 * 1000,
    TB: 1 * 1024 * 1000 * 1000 * 1000,
}

const maxFileSize: number = parseInt(process.env.MAX_FILE_SIZE_MB!) || 30;

function getFileHash(buffer: Buffer): string {
    const hash = crypto.createHash('md5');
    hash.update(buffer);
    return hash.digest('hex');

}
function deleteFile(filepath: string) {
    fs.unlink(filepath, (err) => {
        if (err) console.log(err);
    });

}

function splitFile(filepath: string, ratio: number): { onChainData: Buffer, offChainData: Buffer } {
    const fileSize: number = fs.statSync(filepath).size;
    const fileBuffer: Buffer = fs.readFileSync(filepath);

    let splitSize;

    // set max value when file size + base64 increase is greater
    if (fileSize * ratio * 1.33 > maxFileSize * unitSize.MB) {
        splitSize = maxFileSize * unitSize.MB
    } else {
        splitSize = fileSize * ratio;
    }

    const onChainData: Buffer = fileBuffer.subarray(0, splitSize); // 0 >> n
    const offChainData: Buffer = fileBuffer.subarray(splitSize); // n >> end

    return {onChainData, offChainData}
}

async function mergeFile(onChainData: Buffer, offChainData: Buffer): Promise<Buffer> {
    const res = [];
    // const randomStr = (Math.random() + 1).toString(36).substring(2, 8)
    res[0] = Buffer.from(onChainData.toString(), 'base64');
    res[1] = Buffer.from(await offChainData)
    return Buffer.concat(res);
}

export {unitSize, getFileHash, deleteFile, splitFile, mergeFile}
