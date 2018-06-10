'use strict';
const https = require('https');
const db = require(__dirname+"/../../../config/database");

let option = {
    hostname: "api.hgbrasil.com",
    port: 443,
    agent: false
}

let requestHgWeather = {
    api_key: db.get('settings.hgweather.api_key').value(),
    getByNameCity: function (city) {
        return new Promise((resolve,reject) => {
            option.path = "/weather/?format=json&city_name="+encodeURI(city)+"&key="+this.api_key;
            
            let req = https.get(option, (res) => {
                if(res.statusCode == 200){
                    let chunks = [];
                    
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
    
                    res.on("end", function(){
                        let body = Buffer.concat(chunks);
                        let resp = {
                            status: 200,
                            body: JSON.parse(body.toString())
                        };
                        resolve(resp);
                    });
                }else{
                    let resp = {
                        status: res.statusCode
                    };
                    reject(resp);
                }
            });

            req.on('error', err => {
                console.log(err);
                reject(err);
            });
        })
    },
    getByGeolocation: function (latitude, longitude) {
        return new Promise((resolve,reject) => {
            option.path = "/weather/?format=json&lat=" + latitude + "&lon=" + longitude + "&user_ip=remote&key="+this.api_key    
            let req = https.get(option, (res) => {
                if(res.statusCode == 200){
                    let chunks = [];
                    
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
    
                    res.on("end", function(){
                        let body = Buffer.concat(chunks);
                        let resp = {
                            status: 200,
                            body: JSON.parse(body.toString())
                        };
                        resolve(resp);
                    });
                }else{
                    let resp = {
                        status: res.statusCode
                    };
                    reject(resp);
                }
            });

            req.on('error', err => {
                console.log(err);
                reject(err);
            });
        })
    }
};

module.exports = requestHgWeather;