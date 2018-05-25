'use strict';
const Yeelight = require("../src/modules/yeelight/Yeelight.js");
const HgWeather = require("../src/modules/hg-weather/HgWeather.js");

module.exports = (Mika) => {
    Mika.register(Yeelight);
    Mika.register(HgWeather);
};