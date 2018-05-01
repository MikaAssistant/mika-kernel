'use strict';
const comands = require(__dirname + "/comands.json");
const Device = require('yeelight.js').Device;

const device = new Device({
    id: ' 0x0000000004566be8',
    address: '192.168.2.158',
    port: '55443',
});

let Yeelight = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand]();
    },
    ligar_lampada: function () {
        device
            .powerOn('on').then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    },
    desligar_lampada: function () {
        device
            .powerOn('off').then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    }
};

module.exports = Yeelight;