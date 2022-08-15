const express = require('express');
const ws = require('ws');

const port = process.env.PORT || 8080;
const pid = process.pid

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('client'))

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    socket.on('message', message => console.log(message));
});



const server = app.listen(port, () => console.log(`Example app listening on port ${port} /w pid ${pid}!`));
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});

console.log("monitoring SIGTERM")
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');

    /**
     * This is where cleanup code can be run. In this example we send a message
     * to the connected clients and then cleanup our HTTP server.
     */
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send('SIGTERM recieved, starting clean up!');
        }
    });

    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });

    process.exit(0)
});

console.log("monitoring SIGHUP")
process.on('SIGHUP', () => {
    console.info('SIGHUP signal received.');

    /**
     * This is where cleanup code can be run. In this example we send a message
     * to the connected clients and then cleanup our HTTP server.
     */
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send('SIGHUP recieved, starting clean up!');
        }
    });

    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });

    process.exit(0)
});

console.log("monitoring SIGINT")
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');

    /**
     * This is where cleanup code can be run. In this example we send a message
     * to the connected clients and then cleanup our HTTP server.
     */
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send('SIGINT recieved, starting clean up!');
        }
    });

    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });

    process.exit(0)
});

console.log("monitoring SIGQUIT")
process.on('SIGQUIT', () => {
    console.info('SIGQUIT signal received.');

    /**
     * This is where cleanup code can be run. In this example we send a message
     * to the connected clients and then cleanup our HTTP server.
     */
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send('SIGQUIT recieved, starting clean up!');
        }
    });

    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });

    process.exit(0)
});

console.log("monitoring preStop")
process.on('preStop', () => {
    console.info('preStop signal received.');

    /**
     * This is where cleanup code can be run. In this example we send a message
     * to the connected clients and then cleanup our HTTP server.
     */
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send('SIGQUIT recieved, starting clean up!');
        }
    });

    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });

    process.exit(0)
});