const server = require('../server.js');
const db = server.getDB();

var timingManagement = {
    
     getTimings: (id) => {    
     return new Promise((resolve, reject) => {
         console.log("attimingManagement.js")
         console.log(id);
        db.getTimings(id)
            .then(
                (data) => {
                    resolve(data);
                }
            )
            .catch(
                (err) => {
                    reject(err);
                }
            );
        });
        }
}

module.exports = timingManagement;
