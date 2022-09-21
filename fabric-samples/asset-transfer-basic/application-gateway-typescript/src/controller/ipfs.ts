import {create} from 'ipfs-http-client'
import {unitSize} from '../utils/sizeUtils.js';

const addFile = async (fileName: string, fileBuffer: Buffer, splitSize: number) => {

    console.log(`\n--> Submit IPFS: addFile, split ${splitSize}, size: ${(fileBuffer.length / unitSize.MB)
        .toLocaleString(undefined, {minimumFractionDigits: 2})} MB`);
    const ipfs = create({url: 'http://' + process.env.IPFS_PEER_IP + ':' + process.env.IPFS_PEER_PORT});
    const fileAdded = await ipfs.add({path: fileName, content: fileBuffer});
    const {cid} = fileAdded;
    return cid;
}

export {addFile}

