const Request = require("request");
const momentTz = require("moment-timezone") // suport library
const observedProperties = require("./observedProperties") // get observed Properties for url

module.exports.getdata = function getData(station, callback) {

   var startTime = momentTz().tz("Asia/Colombo").subtract(20, "minute").format().toString(); // Generate start time for request
   var endTime = momentTz().tz("Asia/Colombo").format().toString(); // Generate End time for request

   // console.log(startTime + " to " + endTime);

   const URL = "http://geoservice.ist.supsi.ch/4onse/wa/istsos/services/lka/operations/getobservation/offerings/temporary" +
      "/procedures/" +
      station +
      "/observedproperties/" +
      observedProperties.pressure + "," +
      observedProperties.humidity + "," +
      observedProperties.temperature + "," +
      observedProperties.rainfall + "," +
      observedProperties.windDirection + "," +
      observedProperties.solarLight + "," +
      observedProperties.soilmoisture + "," +
      observedProperties.temperatureInternal + "," +
      observedProperties.windVelocity +
      "/eventtime/" + startTime + "/" + endTime

   const TOKEN = "Basic bGthOm5vYTJEb3No" //  Authorization token

   Request({
      headers: {
         Authorization: TOKEN
      },
      uri: URL,
      method: 'GET'
   }, function (err, res, body) {
      if (err) {
         return console.dir(err);
      }
      const result = JSON.parse(body)
      console.dir(result.data[0].result.DataArray.values);

      if (!result.data[0].result.DataArray.values.length) {
         callback(true, null);
         // console.log("no value to send");
         
      }
      else {
         const data = {
            time: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][0],//
            temperatureInternal: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][1],//
            pressure: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][7],//
            light: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][5],//
            humidity: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][9],//
            temperature: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][11],//
            windVelocity: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][17],//
            rainFall: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][13],//**** */
            windDirection: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][15],//

         }
         // console.log(data);
         callback(err, data);
      }
   });
}

// :url:callback
