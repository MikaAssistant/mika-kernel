'use strict';
const comands = require(__dirname + "/comands.json");
const rgb = require('./../../../config/rgbToInteger.json');
const YeelightScenes = require('./../../../config/YeelightScene.json');
const Device = require('yeelight.js').Device;
const Yeelight = require('yeelight.js').Yeelight;
const yeelight = new Yeelight({verbose: true});
const db = require("./../../../config/database");

let YeelightModule = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    scan_lampada: function (parameters) {

    },
    ligar_lampada: function (parameters) {
        let d = db.get('devices').find({name: 'lampada', group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
         });
         device
            .powerOn('on').then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    },
    desligar_lampada: function (parameters) {
        let d = db.get('devices').find({name: 'lampada', group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
         });
         device
            .powerOn('off').then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    },
    trocar_cor_lampada: function (parameters) {

        let cor = rgb[parameters.cor];

        let d = db.get('devices').find({name: 'lampada', group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
         });
         device
            .setRgb(cor).then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    },
    trocar_cena: function (parameters) {

        let scene = YeelightScenes[parameters.YeelightScenes];

        let d = db.get('devices').find({name: 'lampada', group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
         });
         device
            .setScene(scene.propriedade, scene.val1, scene.val2, scene.val3).then(() => console.log('done'))
            .catch((err) => console.log(err));
        return true;
    }
};

module.exports = YeelightModule;