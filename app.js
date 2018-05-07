'use strict';
//KERNEL
const env = require('dotenv').config().parsed;
const path = require('path');
const config = path.join(__dirname, './config/mika');
const Mika = require('./src/Mika');
require(config)(Mika);

//DATABASE
const db = require(__dirname+"/../../config/database");

//HTTP
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('mika-kernel',function(comand){
        Mika.run(comand.action);
    });
});

http.listen(env.HTTP_PORT, function(){
    console.log('listening on *:'+env.HTTP_PORT);
});