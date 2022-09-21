import {create} from 'ipfs-http-client'

const addFile = async (fileName: string, fileBuffer: Buffer) => {
    const ipfs = create({url: 'http://' + process.env.IPFS_PEER_IP + ':' + process.env.IPFS_PEER_PORT});
    const fileAdded = await ipfs.add({path: fileName, content: fileBuffer});
    const {cid} = fileAdded;
    return cid;
}

export {addFile}

