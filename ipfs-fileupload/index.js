import express from "express";
import dotenv from "dotenv";
import * as ipfsRoutes from "./routes/ipfs.js";

import bodyParser from "body-parser";

dotenv.config({path: '.env'});

const app = express();

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

ipfsRoutes.register(app);

// start the express server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.SERVER_PORT}`);
});
