import fs from 'fs';

export default function log(filename: string, data: string) {
    // append data to file
    fs.appendFile(filename, data, 'utf8',
        function (err) {
            if (err) throw err;
        });
}
