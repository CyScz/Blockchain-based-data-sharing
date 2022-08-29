import http from "https";
import * as Path from "path";
import stream from "stream";
import fs from "fs";
import ipfsAPI from "ipfs-api";
import fileUpload from "express-fileupload";

// Connecting to the ipfs network via gateway
const ipfs = ipfsAPI(process.env.IPFS_PEER_IP, process.env.IPFS_PEER_PORT, {protocol: 'http'})

function getBuffer(path) {
    // Read file from computer
    const testFile = fs.readFileSync(path);
    // Creating buffer for ipfs function to add file to the system
    return Buffer.from(testFile);
}

function deleteFile(filepath) {
    fs.unlink(filepath, (err) => {
        if (err) console.log(err);
    });
}

const imagePath = 'files/';

export const register = (app) => {
    // https://stackoverflow.com/questions/53295303/how-to-use-createparentpath-as-a-parameter-for-mv-express-js
    app.use('/upload', fileUpload({
        useTempFiles: true, tempFileDir: 'tmp/',
        createParentPath: true
    }))

    app.post('/upload', function (req, res) {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        const file = req.files.file;
        const filepath = Path.join(imagePath, file.name)

        file.mv(filepath, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            // ipfs.files.add(getBuffer(filepath), {wrapWithDirectory: true}, function (err, file) {
            ipfs.files.add(getBuffer(filepath), function (err, file) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }

                fs.unlink(filepath, (err) => {
                    if (err) console.log(err);
                });

                res.status(200).send(file);
            });

            // add file to hyperledger and store filename as well
        });
    });

    // Getting the uploaded file via hash code.
    app.get('/get/:id', function (req, res) {
        //This hash is returned hash of addFile router.
        const cid = req.params.id

        ipfs.files.get(cid, function (err, files) {
            files.forEach((file) => {
                console.log(file)
                // res.download(file)
                // console.log(file.content.toString('utf8'))
                var fileContents = Buffer.from(file.content, "base64");
                var readStream = new stream.PassThrough();

                readStream.end(fileContents);
                res.set('Content-disposition', 'attachment; filename=' + file.path);
                res.set('Content-Type', 'text/plain');

                readStream.pipe(res);
            });
        });
    });

};
