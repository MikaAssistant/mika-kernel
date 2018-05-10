'use strict';
const env = require('dotenv').config().parsed;
const socket = require('socket.io-client')('http://'+env.HTTP_HOST+':'+env.HTTP_PORT);
const path = require('path');
const config = path.join(__dirname, './config/mika');
const Mika = require('./src/Mika');
require(config)(Mika);

//DATABASE
const db = require(__dirname+"/config/database");

socket.on('kernel',function(comand){
    let r = Mika.run(comand.action,comand.parameters);
});

console.log('Mika Kernel Running');