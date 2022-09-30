import express from 'express';

import {fileSharingRoutes} from '../routes/fileSharing.js';

class FileSharingApp {

    public app = express();
    public fileSharing: fileSharingRoutes = new fileSharingRoutes();

    constructor() {
        this.config();
        this.fileSharing.routes(this.app);
    }

    private config(): void {
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(express.json());
    }
}

export default new FileSharingApp().app;
