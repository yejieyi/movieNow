const server = require('../server.js');
const db = server.getDB();
var favouritesManagement = {
    addFavourites: (favourite) => {
        return new Promise((resolve, reject) => {
            console.log(favourite);
            db.addFavourites(favourite.movieid, favourite.user)
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
    },
    getFavourites: (id) => {
        console.log(id);
        return new Promise((resolve, reject) => {
            db.getFavourites(id)
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
        })

    }

}

module.exports = favouritesManagement;
