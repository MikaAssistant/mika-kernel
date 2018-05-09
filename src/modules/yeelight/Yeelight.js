'use strict';
const comands = require(__dirname + "/comands.json");
const rgb = require('./../../../config/rgbToInteger.json');
const Device = require('yeelight.js').Device;
const Yeelight = require('yeelight.js').Yeelight;
const yeelight = new Yeelight({verbose: true});
const Device = require('./../database/models/device');

let YeelightModule = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    scan_lampada: function (parameters) {

    },
    ligar_lampada: function (parameters) {
        Device.findOne({
            name: 'lampada',
            group: parameters.group
        }, function (err, d) {
            if(err) {
                return;
            }
            const device = new Device({
                id: d.id,
                address: d.address,
                port: d.port,
             });
        
             device
                .powerOn('on').then(() => console.log('done'))
                .catch((err) => console.log(err));
            return true;
        });
    },
    desligar_lampada: function (parameters) {
        Device.findOne({
            name: 'lampada',
            group: parameters.group
        }, function (err, d) {
            if(err) {
                return;
            }
            const device = new Device({
                id: d.id,
                address: d.address,
                port: d.port,
             });
        
             device
                .powerOn('off').then(() => console.log('done'))
                .catch((err) => console.log(err));
            return true;
        });
    },
    trocar_cor_lampada: function (parameters) {

        Device.findOne({
            name: 'lampada',
            group: parameters.group
        }, function (err, d) {
            if(err) {
                return;
            }
            const device = new Device({
                id: d.id,
                address: d.address,
                port: d.port,
             });
        
            let cor = rgb[parameters.color];
        
            device
                .setRgb(cor).then(() => console.log('done'))
                .catch((err) => console.log(err));
            return true;
        });
    }
};

module.exports = YeelightModule;