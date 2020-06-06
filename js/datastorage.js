const mongoose = require('mongoose');
var http = require("https"); //04/07
const schema = mongoose.Schema;
var userSchema = {};
var userModel;
var reviewSchema = {};
var reviewModel;
var timeSchema = {};
var timeModel;
var movieSchema = {};
var movieModel;
var cinemaSchema = {};
var cinemaModel;
var favouriteSchema = {}
var favouriteModel = {}
var watchListSchema = {}
var watchListModel;

var database = {
    connect: () => {
        return mongoose.connect('mongodb://localhost:27017/', {
            dbName: 'movieNow'
        });
    },
    initialize: () => {
        userSchema = schema({
            name: String,
            password: String,
            email: String,
            phoneNumber: Number
        });
        reviewSchema = schema({
            movieid: String,
            userid: String,
            rank: Number,
            review: String
        });
        timeSchema = schema({
            time: String
        });
        movieSchema = schema({
            movieid: String,
            timingid: String,
            timing: {
                type: schema.Types.ObjectId,
                ref: 'Timing'
            },
            cinema: {
                type: schema.Types.ObjectId,
                ref: 'Cinema'
            }

        });
        cinemaSchema = schema({
            name: String,
            location: String

        });
        favouriteSchema = schema({
            movieid: String,
            user: {
                type: schema.Types.ObjectId,
                ref: 'Organizer'
            }
        });
        watchListSchema = schema({
            movieid: String,
            user: {
                type: schema.Types.ObjectId,
                ref: 'Organizer'
            }
        });
        var connection = mongoose.connection;
        userModel = connection.model('User', userSchema);
        reviewModel = connection.model('Review', reviewSchema);
        timeModel = connection.model('Timing', timeSchema);
        movieModel = connection.model('Movie', movieSchema);
        cinemaModel = connection.model('Cinema', cinemaSchema);
        favouriteModel = connection.model('Favourite', favouriteSchema);
        watchListModel = connection.model('WatchList', watchListSchema);
    },
    getAllusers: () => {
        return userModel.find({}).exec();
    },
    addUser: (name, password, email, phoneNumber) => {
        var newUser = new userModel({
            name: name,
            password: password,
            email: email,
            phoneNumber: phoneNumber
        });
        console.log("add user in ds");
        return newUser.save();

        //also returns a promise
    },
    addReview: (movieid, userid, rank, review) => {
        var newReview = new reviewModel({
            movieid: movieid,
            userid: userid,
            rank: rank,
            review: review
        });
        console.log("add review in ds");
        return newReview.save();

        //also returns a promise
    },
    loginUser: (name, password) => {
        console.log("login user");
        var user = {
            name: name,
            password: password
        };
        console.log(user);
        return userModel.findOne(user).exec();
    },
    getUser: (id) => {
        return userModel.findById(id).exec();
    },
    getReviewsByUserId: (id) => {
        return reviewModel.find({
            userid: id
        }).exec();
    },
    updateUser: (id, name, password, email, phoneNumber) => {
        var updatedUser = {
            name: name,
            password: password,
            email: email,
            phoneNumber: phoneNumber
        };

        console.log("At datastorage.js");
        console.log(updatedUser);

        return userModel.findByIdAndUpdate(id, updatedUser).exec();
    },
    getFavourites: () => {
        return bedModel.find({
            status: "Available"
        }).exec();
    },
    getAllTimings: () => {
        return timeModel.find({}).sort({
            time: 1
        }).exec();
    },
    getMovies: (timeId) => {
        console.log(timeId);
        return movieModel.find({
            timingid: timeId
        }).exec();
    },
    getCinema: (cinemaId) => {
        return cinemaModel.findById(cinemaId).exec();
    },
    getTime: (timeId) => {
        return timeModel.findById(timeId).exec();
    },

    getAllcurrentmovies: () => {
        console.log("atDataStorage.js");
        return movieModel.find({}).exec();
    },
    populateMovies: (movies) => {
        return movieModel.populate(movies, {
            path: 'timing cinema'
        });
    },
    addFavourites: (movieid, userid) => {
        var newFavourite = new favouriteModel({
            movieid: movieid,
            user: userid
        });
        console.log("add favourite in ds");
        return newFavourite.save();
    },
    getFavourites: (id) => {
        return favouriteModel.find({
            user: id
        }).exec();
    },
    addWatchList: (movieid, userid) => {
        var newWatchList = new watchListModel({
            movieid: movieid,
            user: userid
        })
        console.log("add watch list in ds");
        return newWatchList.save();
    },
    getWatchList: (id) => {
        return watchListModel.find({
            user: id
        }).exec();
    }
};

module.exports = database;
