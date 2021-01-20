const request = require("postman-request");

function forecast({ latitude, longitude } = {}, callback) {
  const url = `
  http://api.weatherstack.com/current?access_key=2943fb3bb2c404c500b3671604e3e90b&query=${latitude},${longitude}&units=f`;
  request(
    {
      url,
      json: true,
    },
    function (error, { body } = {}) {
      if (error) {
        callback("Unable to connect to weather services", undefined);
      } else if (body.error) {
        console.log("Unable to find the given location", undefined);
      } else {
        callback(
          undefined,
          `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees outIt feels like ${body.current.feelslike} degrees out.
          Temperature ${body.current.temperature} degrees
          `
        );
      }
    }
  );
}

module.exports = forecast;
