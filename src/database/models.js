const mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_DATABASE);

const db = mongoose.connection;

const devicesModel = require("./models/usuarioModule")({db, errorHandler});

module.exports = {
    devices: () => devicesModel
};