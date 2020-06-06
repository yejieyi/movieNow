var server = require('./server.js');
const io = server.getSocketIO();
server.startServer();
// server.connectToDB()
//     .then(dbConnectionSuccess)
//     .catch(errorHandler);

// function dbConnectionSuccess(message) {
//     console.log(message);
//     console.log("db connection");
//     const userManagement = require('./js/userManagement.js');
//     io.on('connection', (socket) => {});

// };



function errorHandler(err) {
    console.log(err);
}
