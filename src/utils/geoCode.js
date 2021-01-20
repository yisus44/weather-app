const request = require("postman-request");

function geoCode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiamVzdXNmbG9yZXMxOTUzIiwiYSI6ImNranhkc2ozcjAzY28yeXBneWR5aGo2eWYifQ.rIZus4KIBwE6oCEk9aoyiQ&limit=1&`;
  request({ url, json: true }, function (error, { body }) {
    if (error) {
      callback("Unable to conect", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find conection", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
}

module.exports = geoCode;
