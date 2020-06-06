const server = require('../server.js');
const db = server.getDB();
var watchlistManagement = {
    addWatchList: (watchlist) => {
        return new Promise((resolve, reject) => {
            console.log(watchlist);
            db.addWatchList(watchlist.movieid, watchlist.user)
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
    getWatchList: (id) => {
        console.log(id);
        return new Promise((resolve, reject) => {
            db.getWatchList(id)
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

module.exports = watchlistManagement;
