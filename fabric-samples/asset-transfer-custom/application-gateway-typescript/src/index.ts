import * as http from 'http';
import dotenv from 'dotenv';

import App from './app/fileSharing.js'

dotenv.config({path: '.env'});

http.createServer(App)
    .listen(process.env.API_SERVER_PORT, () => {
        console.log('Express server listening on port ' + process.env.API_SERVER_PORT);
    });
