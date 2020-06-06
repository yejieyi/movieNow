const bodyParser = require('body-parser');
const server = require('../server.js');
var http = require("https");
const userManagement = require('../js/userManagement.js');

routes = function () {
    var externalRoutes = require('express').Router();
    var io = server.getSocketIO();

    externalRoutes.use(bodyParser.urlencoded({
        extended: true
    }));
    externalRoutes.use(bodyParser.json());
    externalRoutes.get('/', (req, res) => {
        res.sendFile("/views/index.html", {
            'root': './'
        });
    });
    externalRoutes.get('/random', (req, res) => {
        res.sendFile("/views/random.html", {
            'root': './'
        });
    });

    externalRoutes.get('/css/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    externalRoutes.get('/js/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });
    externalRoutes.get('/images/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    //    externalRoutes.get('/login', (req, res) => {
    //        res.sendFile("/views/login.html", {
    //            'root': './'
    //        });
    //    });

    externalRoutes.get('/register', (req, res) => {
        res.sendFile("/views/register.html", {
            'root': './'
        });
    });
    externalRoutes.post('/search', (req, res) => {
        var searchText = req.body.searchText;
        var options = {
            "method": "GET",
            "hostname": "api.themoviedb.org",
            "port": null,
            "path": "/3/search/movie?include_adult=false&page=1&query=" + searchText + "r&language=en-US&api_key=343f078c30e5ffe3c08cc3da703c7633",
            "headers": {}
        };
        var body;

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                body = Buffer.concat(chunks);
                body = JSON.parse(body).results;
                console.log(body);
                return body;
                //                console.log(JSON.parse(body).results);
                //                console.log(body.toString());
            }).done((data) => {
                //                console.log(data);
                console.log("hello");
                //                console.log(body);
                //                req.write("{}");
                //                req.end();
                //                res.status(200).send("hi");
                //                console.log("hi");
            });

            res.on("error", function () {
                console.log("error");
            })


            req.end();

        })


    });

    externalRoutes.get('/details', (req, res) => {
        res.sendFile("/views/details.html", {
            'root': './'
        });
    });
    externalRoutes.get('/castdetails', (req, res) => {
        res.sendFile("/views/castdetails.html", {
            'root': './'
        });
    })


    externalRoutes.route('/login')
        .get((req, res) => {
            res.sendFile("/views/login.html", {
                'root': './'
            });
        })
        .post((req, res) => {
            var data = req.body;
            console.log(data);
            userManagement.loginUser(data)
                .then(
                    (data) => {
                        //                        if (data.length) {

                        res.status(200).send(data);

                        //                        res.status(200).send("Login successfully!");
                        //                        } else {
                        //                            res.status(200).send();
                        //                        }

                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    });
        });

    externalRoutes.route('/users')
        .post((req, res) => {
            var data = req.body;
            console.log(data);
            userManagement.addUser(data)
                .then(
                    () => {
                        res.status(200).send("User added successfully!");
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    });

        })
        .put((req, res) => {
            var data = req.body;
            userManagement.updateUser(data)
                .then(
                    () => {
                        res.status(200).send("User updated successfully!");
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        });



    return externalRoutes;
};

module.exports = routes();
