const express = require('express');
const indexRouter = require('./routers/index');

const initialiseApplication = () => {
    const app = express();

    // enable CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const defaultPort = 4000;
    const port = normalizePort(process.env.PORT || defaultPort, defaultPort);

    app.listen(port, () => {
        console.log("Listening on port " + port)
    });

    app.use('/', indexRouter);

    // Error handling middleware function
    app.use((err, req, res, next) => {

        const errorCode = err.code || 500;

        if (errorCode === 500) {
            res.status(errorCode).send('Internal Server Error');
        } else {
            res.status(errorCode).send(err.message);
        }
    })
};

normalizePort = (val, defaultPort) => {
    const port = parseInt(val, 10);

    if (isNaN(port) || port < 0) {
        return defaultPort;
    }

    return port;
};

initialiseApplication();

module.exports.initialiseApplication = initialiseApplication;

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
