//const db = require('./js/datastorage.js');
const server = require('../server.js');
const db = server.getDB();
var loggedInUser;
var userManagement = {
    loginUser: (user) => {
        return new Promise((resolve, reject) => {
            console.log(user);
            db.loginUser(user.name, user.password)
                .then(
                    (data) => {
                        if (data != null) {
                            loggedInUser = data;
                            resolve(data);
                        } else {
                            reject("Invalid Credentials");
                        }

                    }
                )
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getLoggedInUser: () => {
        return loggedInUser;
    },
    getUser: (id) => {
        return new Promise((resolve, reject) => {
            db.getUser(id)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    addUser: (newUser) => {
        return new Promise((resolve, reject) => {
            db.addUser(newUser.name, newUser.password,
                    newUser.email, newUser.phoneNumber)
                .then(
                    (data) => {
                        loggedInUser = data;
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
    updateUser: (updatedUser) => {
        return new Promise((resolve, reject) => {
            db.updateUser(updatedUser.id, updatedUser.name,
                    updatedUser.password, updatedUser.email,
                    updatedUser.phoneNumber)
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
};

module.exports = userManagement;
