'use strict';
const comands = require(__dirname + "/comands.json");
const rgb = require('./../../../config/rgbToInteger.json');
const YeelightScenes = require('./../../../config/YeelightScene.json');
const Device = require('yeelight.js').Device;
const Yeelight = require('yeelight.js').Yeelight;
const db = require("./../../../config/database");
const Response = require(__dirname + "/../../Response");

let YeelightModule = {
    comands: comands,
    module: 'Yeelight',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    scannerDevice: async function () {
        let devices = [];
        const yeelight = new Yeelight({verbose: true});
        return new Promise((resolve,reject) => {
            yeelight.discover(10000).then((d) => {
                for(let i = 0; i < d.length; i++){
                    let device = {};
                    device.id = d[i].id;
                    device.address = d[i].address;
                    device.port = d[i].port;
                    devices.push(device);
                }
                yeelight.discovery.stop();
                Response.body = devices;
                resolve(Response);
            }).catch( function ( erro ) {
                reject(erro)
            });
        });
    },
    ligarDevice: async function (parameters) {
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        if(d === undefined){
            Response.message = parameters.device + " não encontrada";
            return Response;
        }
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.powerOn('on');
        }catch(err) {}
        return Response;
    },
    desligarDevice: async function (parameters) {
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        if(d === undefined){
            Response.message = parameters.device + " não encontrada";
            return Response;
        }
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.powerOn('off');
        }catch(err) {}
        return Response;
    },
    trocarCorDevice: async function (parameters) {
        let cor = rgb[parameters.cor];
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        if(d === undefined){
            Response.message = parameters.device + " não encontrada";
            return Response;
        }
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.setRgb(cor);
        }catch(err) {}
        return Response;
    },
    trocarCenaDevice: async function (parameters) {
        let scene = YeelightScenes[parameters.YeelightScenes];
        let d = db.get('devices').find({name: parameters.device, group: parameters.group}).value();
        if(d === undefined){
            Response.message = parameters.device + " não encontrada";
            return Response;
        }
        const device = new Device({
            id: d.id,
            address: d.address,
            port: d.port,
        });
        try {
            await device.setScene(scene.propriedade, scene.val1, scene.val2, scene.val3);
        }catch(err) {}
        return Response;
    }
};

module.exports = YeelightModule;