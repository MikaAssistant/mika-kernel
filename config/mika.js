'use strict';
const Yeelight = require("../src/modules/yeelight/Yeelight.js");

module.exports = (Mika) => {
    Mika.register(Yeelight);
};