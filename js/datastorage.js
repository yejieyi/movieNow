const mongoose = require('mongoose');
var http = require("https"); //04/07
const schema = mongoose.Schema;
var patientSchema = {};
var patientModel;
var bedSchema = {};
var bedModel;
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
        var connection = mongoose.connection;
        userModel = connection.model('User', userSchema);

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
    loginUser: (name, password) => {
        console.log("login user");
        var user = {
            name: name,
            password: password
        }
        console.log(user);
        return userModel.find(user).exec();
    },
    updateUser: (id) => {},
    getFavourites: () => {
        return bedModel.find({
            status: "Available"
        }).exec();
    }
};

module.exports = database;
