$(function () {
    "use strict";

    var log = $('#log');
    var host = window.location.host

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        log.html($('<p>', { text: 'Oof, your browser doesn\'t support WebSockets.'} ));
        return;
    }

    var connection = new WebSocket(`wss://${host}`);

    connection.onopen = function () {
        addLog('Connection Opened!')
    };

    connection.onerror = function (error) {
        addLog(`Connected errored or closed: ${error}`);
    };

    connection.onmessage = function (message) {
        addLog(message.data);
    };

    setInterval(function() {
        if (connection.readyState !== 1) {
            addLog('websocket connection to server doesn\'t appear to be open anymore...')
            return
        }
        addLog('connection healthy')
    }, 3000);

    function addLog(msg) {
        log.append('<p>' + msg + '</p>');
    }
});