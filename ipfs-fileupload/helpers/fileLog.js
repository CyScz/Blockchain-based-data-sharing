import fs from "fs";

export default function log(data) {
    // append data to file
    fs.appendFile('log.txt', data, 'utf8',
        function (err) {
            if (err) throw err;
        });
}
