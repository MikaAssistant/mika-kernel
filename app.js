'use strict';
const env = require('dotenv').config().parsed;
const socket = require('socket.io-client')('http://'+env.HTTP_HOST+':'+env.HTTP_PORT);
const path = require('path');
const config = path.join(__dirname, './config/mika');
const Mika = require('./src/Mika');
require(config)(Mika);

let target = 'client';

socket.on('kernel',async function(request){
    let response = await Mika.run(request.action,request.parameters);
    if(request.target !== undefined){
        target = request.target;
    }
    if(response.message !== null || response.body !== null){
        socket.emit(target,response);
    }
});

console.log('Mika Kernel Running');