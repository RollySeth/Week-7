const Weather = require('../models/weather');

module.exports.getWeather = async (location) => {
  return await Weather.findOne( { name: location });
}

module.exports.addWeather = async (location,temperature) => {
    const addedWeatherByLocation= await Weather.create({ 'name' : location, 'temperature' : temperature });
  return addedWeatherByLocation;
  }