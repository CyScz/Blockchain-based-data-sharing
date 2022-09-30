import {create} from 'ipfs-http-client'

const addFile = async (fileName: string, fileBuffer: Buffer) => {
    const ipfs = create({url: 'http://' + process.env.IPFS_PEER_IP + ':' + process.env.IPFS_PEER_PORT});
    const fileAdded = await ipfs.add({path: fileName, content: fileBuffer.toString('base64')});
    const {cid} = fileAdded;
    return cid;
}

const getFile = async (cid: string) => {
    const ipfs = create({url: 'http://' + process.env.IPFS_PEER_IP + ':' + process.env.IPFS_PEER_PORT});

    const stream = ipfs.cat(cid);
    let ipfsData = ''
    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        ipfsData += chunk.toString();
    }
    return Buffer.from(ipfsData, 'base64');
}

export {addFile, getFile}
