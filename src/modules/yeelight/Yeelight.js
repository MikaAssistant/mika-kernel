'use strict';
const comands = require(__dirname + "/comands.json");
const rgb = require('./../../../config/rgbToInteger.json');
const Device = require('yeelight.js').Device;
const Yeelight = require('yeelight.js').Yeelight;
const yeelight = new Yeelight({verbose: true});
//const io = require('socket.io-client');
//const socket = io.connect('http://localhost:5000');

const device = new Device({
   id: ' 0x0000000004566be8',
   address: '192.168.2.158',
   port: '55443',
});

let YeelightModule = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    scan_lampada: function (parameters) {
        yeelight.discover(10000).then((devices) => {
            let body = [];
            for(let i = 0; i < devices.length; i++){
                let d = {};
                d.id = devices[i].id;
                d.address = devices[i].address;
                d.port = devices[i].port;
                body.push(d);
            }
            let r = {};
            r.header = {
                destination: 'client'
            };
            r.body = body;
            //socket.emit('client', r);
        });
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

module.exports = YeelightModule;