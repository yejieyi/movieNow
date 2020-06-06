const server = require('../server.js');
const db = server.getDB();
var movieManagement = {
    getAllTimings: () => {
        return new Promise((resolve, reject) => {
            db.getAllTimings()
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
    getMovies: (timeId) => {
        return new Promise((resolve, reject) => {
            db.getMovies(timeId)
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
    },
    getCinema: (cinemaId) => {
        return new Promise((resolve, reject) => {
            db.getCinema(cinemaId)
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
    },
    getTime: (timeId) => {
        return new Promise((resolve, reject) => {
            db.getTime(timeId)
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
    },
    getAllcurrentmovies: () => {
        return new Promise((resolve, reject) => {
            console.log("atmovieManagement.js")
            db.getAllcurrentmovies()
                .then(
                    (unpopulatedData) => {
                        db.populateMovies(unpopulatedData)
                            .then(
                                (populatedData) => {
                                    resolve(populatedData);
                                }
                            )
                            .catch(
                                (err) => {
                                    reject(err);
                                }
                            )
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

module.exports = movieManagement;
