const server = require('../server.js');
const db = server.getDB();

var cinemaManagement = {

    getCinemas: (id) => {
        return new Promise((resolve, reject) => {
            console.log("atCinemaManagement.js")
            console.log(id);
            db.getCinemas(id)
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

module.exports = cinemaManagement;
