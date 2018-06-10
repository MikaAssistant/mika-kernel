'use strict';
const env = require('dotenv').config().parsed;
const socket = require('socket.io-client')('http://'+env.HTTP_HOST+':'+env.HTTP_PORT);
const path = require('path');
const config = path.join(__dirname, './config/mika');
const Mika = require('./src/Mika');
require(config)(Mika);

socket.on('kernel',async function(comand){
    let response = await Mika.run(comand.action,comand.parameters);
    if(response.message !== null){
        socket.emit('client',response);
    }
});

console.log('Mika Kernel Running');