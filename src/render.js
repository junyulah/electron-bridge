'use strict';

/**
 * main process define some functions,
 *
 * rendered process can call these methods.
 */

let {
    ipcRenderer
} = require('electron');

let {
    pc
} = require('general-bridge');

module.exports = (channelName, sandbox = {}) => {
    let send = (data) => ipcRenderer.send(channelName, data);

    return pc((handle) => {
        ipcRenderer.on(channelName, (event, arg) => {
            handle(arg, send);
        });
    }, send, sandbox);
};
