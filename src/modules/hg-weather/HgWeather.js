'use strict';
const comands = require(__dirname + "/comands.json");
const http = require("http");
const db = require("./../../../config/database");
const request = require(__dirname + "/requestHgWeather");
const Response = require(__dirname + "/../../Response")

let HgWeatherModule = {
    comands: comands,
    api_key: db.get('settings.hgweather.api_key').value(),
    module: 'HgWeather',
    run: function (comand,parameters) {
        return this[comand](parameters);
    },
    previsao_do_tempo: async function (parameters) {
        let weather = await request.getByNameCity(parameters.city);
        return new Promise((resolve,reject) => {
            if(weather.status == 200){
                let message = "O " + weather.body.results.currently + " está " + weather.body.results.description + " com a temperatura de " + weather.body.results.temp;
                Response.message = message;
                resolve(Response);
            }else{
                reject(weather.status);
            }
        })
    }
};

module.exports = HgWeatherModule;