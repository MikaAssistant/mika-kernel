'use strict';
const comands = require(__dirname + "/comands.json");
const Device = require('yeelight.js').Device;
const rgb = require('./../../../config/rgbToInteger.json');

//const device = new Device({
//    id: ' 0x0000000004566be8',
//    address: '192.168.2.158',
//    port: '55443',
//});

let Yeelight = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    ligar_lampada: function (parameters) {
        device
            .powerOn('on').then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    },
    desligar_lampada: function (parameters) {
        device
            .powerOn('off').then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    },
    trocar_cor_lampada: function (parameters) {
        let cor = rgb[parameters.color];
        
        device
            .setRgb(cor).then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    }
};

module.exports = Yeelight;