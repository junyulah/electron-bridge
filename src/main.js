'use strict';

/**
 * main process define some functions,
 *
 * rendered process can call these methods.
 */

let {
    pc
} = require('general-bridge');

let {
    ipcMain
} = require('electron');

module.exports = (channelName, sandbox = {}, send) => {
    let channelSend = (data) => send(channelName, data);
    return pc((handler) => {
        ipcMain.on(channelName, (event, arg) => {
            handler(arg, channelSend);
        });
    }, channelSend, sandbox);
};
