'use strict';
const comands = require(__dirname + "/comands.json");
const rgb = require('./../../../config/rgbToInteger.json');
const YeelightScenes = require('./../../../config/YeelightScene.json');
const Device = require('yeelight.js').Device;
const Yeelight = require('yeelight.js').Yeelight;
const yeelight = new Yeelight({verbose: true});
const db = require("./../../../config/database");
const Response = require(__dirname + "/../../Response")

let YeelightModule = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    scan_lampada: function (parameters) {

    },
    ligarDevice: async function (parameters) {
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.powerOn('on');
        }catch(err) {}
    },
    desligarDevice: async function (parameters) {
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.powerOn('off');
        }catch(err) {}
    },
    trocarCorDevice: async function (parameters) {
        let cor = rgb[parameters.cor];
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.setRgb(cor);
        }catch(err) {}
    },
    trocarCenaDevice: async function (parameters) {
        let scene = YeelightScenes[parameters.YeelightScenes];
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.setScene(scene.propriedade, scene.val1, scene.val2, scene.val3);
        }catch(err) {}
    }
};

module.exports = YeelightModule;