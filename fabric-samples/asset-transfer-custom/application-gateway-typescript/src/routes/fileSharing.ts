import express, {Express, Request, Response} from 'express';
import Path from 'path';
import fileUpload from 'express-fileupload';
import * as ipfs from '../controller/ipfs.js';
import * as hl from '../controller/hyperledger.js';

import {deleteFile, getFileHash, mergeFile, splitFile} from '../utils/file.js';
import {CID} from 'ipfs-http-client';
import {Asset} from '../model/Asset.js';
import {getTimeWithMs} from '../utils/date.js';

import stream from 'stream';

const TEMP_PATH = process.env.TEMP_FILE_PATH!;

export class fileSharingRoutes {
    public routes(app: Express): void {

        // https://stackoverflow.com/questions/53295303/how-to-use-createparentpath-as-a-parameter-for-mv-express-js
        app.use(process.env.SERVER_PATH + '/upload', fileUpload({
            useTempFiles: true, tempFileDir: TEMP_PATH,
            createParentPath: true
        }))

        // serve html files
        app.get('/', function (req: Request, res: Response) {
            res.sendFile('index.html', {root: process.cwd() + '/dist/public'});
        })

        // test api
        app.route(process.env.SERVER_PATH + '/test')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'FileSharing GET request successful !'
                });
            });

        // download
        app.route(process.env.SERVER_PATH + '/download/:id')
            .get((req: Request, res: Response) => {

                // retrieve asset from Hyperledger
                hl.getAsset(req.params.id)
                    .then(hyperledgerRes => {
                        const asset = new Asset(JSON.parse(hyperledgerRes));
                        console.log(`Download ${asset.toString()}`)

                        // retrieve file from IPFS
                        ipfs.getFile(asset.OffChainIpfsCid)
                            .then(async ipfsRes => {
                                const file = await mergeFile(Buffer.from(asset.OnChainData), Buffer.from(ipfsRes));
                                const readStream = new stream.PassThrough();
                                readStream.end(file);
                                res.set('Content-disposition', 'attachment; filename=' + asset.Filename);
                                res.set('Content-Type', 'text/plain');
                                readStream.pipe(res);
                            });
                    });
            });

        // upload
        app.route(process.env.SERVER_PATH + '/upload')
            .post((req: Request, res: Response) => {
                if (!req.files) {
                    return res.status(400).send('No file uploaded.');
                }

                const file = req.files.file as fileUpload.UploadedFile;
                const splitRatio = parseInt(req.body.splitRatio) / 100;
                const randomStr = (Math.random() + 1).toString(36).substring(2, 8)

                // set random filename to prevent file to be erased by another concurrent upload with same filename
                const tempFilepath = Path.join(TEMP_PATH, randomStr + '.tmp');
                console.log(tempFilepath)
                // generate the asset id with random string
                const assetId = getTimeWithMs(new Date()).replace(/[:.]/g, '') + '-' + randomStr

                file.mv(tempFilepath, (err: Error) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }

                    // split file
                    const {onChainData, offChainData}:
                        { onChainData: Buffer, offChainData: Buffer } = splitFile(tempFilepath, splitRatio);

                    ipfs.addFile(file.name, offChainData)
                        .then((cid: CID) => {
                            const asset: Asset = new Asset({
                                ID: assetId,
                                Filename: file.name,
                                Size: file.size,
                                Hash: file.md5,
                                Sender: 'application-gateway-typescript',
                                SplitRatio: splitRatio,
                                OnChainHash: getFileHash(onChainData),
                                OnChainData: onChainData.toString('base64'),
                                OffChainHash: getFileHash(offChainData),
                                OffChainIpfsCid: cid.toString()
                            });

                            console.log(`Upload ${asset.toString()}`)

                            hl.addAsset(asset)
                                .then(result => {
                                    deleteFile(tempFilepath);
                                    const json = JSON.stringify({
                                        'hyperledger_id': asset.ID,
                                        'ipfs_cid': cid.toString()
                                    });
                                    console.log(json)

                                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                                    res.status(200).send(json);

                                    // res.end(json.toString());
                                });
                        });
                });
            });
    }
}
