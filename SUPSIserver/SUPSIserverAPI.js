const Request = require("request");
const momentTz = require("moment-timezone") // suport library
const moment = require("moment");
const observedProperties = require("./observedProperties") // get observed Properties for url

module.exports.getDisplayData = function getData(station, callback) {

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
      else {

         const result = JSON.parse(body);
         if (result.data == undefined) { // check data is available to read
            console.log("undifined");
            callback(true, null);
            return; // stop function doing futher operations
         }
         // console.dir(result.data[0].result.DataArray.values);

         if (!result.data[0].result.DataArray.values.length || result.data.length == 0) {
            callback(true, null);
            // console.log("no value to send");
         }
         else {
            momentDateTime = momentTz(result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][0]).tz("Asia/Colombo");
            // console.log(momentDateTime.format("YYYY-MM-DD HH:mm"));
            const data = {
               time: momentDateTime.format("HH:mm"),
               date: momentDateTime.format("YYYY-MM-DD"),
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
      }
   });
}

module.exports.multipledata = function getData(station, callback) {

   var startTime = momentTz().tz("Asia/Colombo").subtract(2, "h").format().toString(); // Generate start time for request
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
      gatherData = [];
      if (err) {
         return console.dir(err);
      }
      else {

         const result = JSON.parse(body);
         if (result.data == undefined || result.data.length == 0) { // check data is available to read
            console.log("undifined");
            callback(true, null);
            return; // stop function doing futher operations
         }
         // console.dir(result.data[0].result.DataArray.values);

         if (!result.data[0].result.DataArray.values.length) {
            callback(true, null);
            // console.log("no value to send");
         }
         else {
            for (let i = result.data[0].result.DataArray.values.length - 1; i >= 0; i--) {
               momentDateTime = momentTz(result.data[0].result.DataArray.values[i][0]).tz("Asia/Colombo");
               // console.log(momentDateTime.format("YYYY-MM-DD HH:mm"));
               const data = {
                  time: momentDateTime.format("HH:mm"),
                  date: momentDateTime.format("YYYY-MM-DD"),
                  temperatureInternal: result.data[0].result.DataArray.values[i][1],//
                  pressure: result.data[0].result.DataArray.values[i][7],//
                  light: result.data[0].result.DataArray.values[i][5],//
                  humidity: result.data[0].result.DataArray.values[i][9],//
                  temperature: result.data[0].result.DataArray.values[i][11],//
                  windVelocity: result.data[0].result.DataArray.values[i][17],//
                  rainFall: result.data[0].result.DataArray.values[i][13],//**** */
                  windDirection: result.data[0].result.DataArray.values[i][15],//
               }
               gatherData.push(data);
            }
            // console.log(data);
            callback(err, gatherData);
         }
      }
   });
}

/**
 * get last data set of a station
 * changeing the substractiong time in hours you can get t hours data set
 * @code var startTime = momentTz().tz("Asia/Colombo").subtract(2, "h").format().toString();
 * change 2 to 3 and you can get last 3 hours data set if it is available at the server.
 * @param station name of the staton procedure name of station
 * @param type type of station weater station or river for weather station type shyld be 1
 * and for the river station there is two type:
 *    type 1 type id 2  this type of stations have observerd property of water hight as urn:ogc:def:parameter:x-istsos:1.0:river:water:height
 *    type 2 type id 3  this type of station have observerd property of water hight as urn:ogc:def:parameter:x-istsos:1.0:river:water:discharge
 * @param   callback call back function after exicution of function
 */

module.exports.multipledataWL = function getData(station, type, callback) {

   var startTime = momentTz().tz("Asia/Colombo").subtract(2, "h").format().toString(); // Generate start time for request
   var endTime = momentTz().tz("Asia/Colombo").format().toString(); // Generate End time for request

   // console.log(startTime + " to " + endTime);

   var URL = "http://geoservice.ist.supsi.ch/4onse/wa/istsos/services/lka/operations/getobservation/offerings/temporary" +
      "/procedures/" +
      station +
      "/observedproperties/"
   if (type == 2) {
      URL += observedProperties.waterheight;
   }
   else if (type == 3) {
      URL += observedProperties.waterdischarge;
   }
   else {
      callback(true, null);
      return;
   }
   URL += "/eventtime/" + startTime + "/" + endTime

   const TOKEN = "Basic bGthOm5vYTJEb3No" //  Authorization token

   Request({
      headers: {
         Authorization: TOKEN
      },
      uri: URL,
      method: 'GET'
   }, function (err, res, body) {
      gatherData = [];
      if (err) {
         return console.dir(err);
      }
      else {

         const result = JSON.parse(body);

         if (result.data == undefined || result.data.length == 0) { // check data is available to read
            console.log("undifined");
            callback(true, null);
            return; // stop function doing futher operations
         }
         // console.dir(result.data[0].result.DataArray.values);

         if (!result.data[0].result.DataArray.values.length) {
            callback(true, null);
            // console.log("no value to send");
         }
         else {
            for (let i = result.data[0].result.DataArray.values.length - 1; i >= 0; i--) {
               momentDateTime = momentTz(result.data[0].result.DataArray.values[i][0]).tz("Asia/Colombo");
               // console.log(momentDateTime.format("YYYY-MM-DD HH:mm"));
               const data = {
                  time: momentDateTime.format("HH:mm"),
                  date: momentDateTime.format("YYYY-MM-DD"),
                  waterLevel: result.data[0].result.DataArray.values[i][1]//
                  // pressure: result.data[0].result.DataArray.values[i][7],//
                  // light: result.data[0].result.DataArray.values[i][5],//
                  // humidity: result.data[0].result.DataArray.values[i][9],//
                  // temperature: result.data[0].result.DataArray.values[i][11],//
                  // windVelocity: result.data[0].result.DataArray.values[i][17],//
                  // rainFall: result.data[0].result.DataArray.values[i][13],//**** */
                  // windDirection: result.data[0].result.DataArray.values[i][15],//
               }
               gatherData.push(data);
            }
            // console.log(data);
            callback(err, gatherData);
         }
      }
   });
}

/**
 * find last dala log
 * of a paticuler
 * station
 * @param time current time
 * @param station name of the staton procedure name of station
 * @param type type of station weater station or river for weather station type shyld be 1
 * and for the river station there is two type:
 *    type 1 type id 2  this type of stations have observerd property of water hight as urn:ogc:def:parameter:x-istsos:1.0:river:water:height
 *    type 2 type id 3  this type of station have observerd property of water hight as urn:ogc:def:parameter:x-istsos:1.0:river:water:discharge
 * @param   callback call back function after exicution of function
 */
module.exports.findLastDataLog = function getData(time, station, type, callback) {
   var startTime = momentTz().tz("Asia/Colombo").subtract(time, "d").format().toString(); // Generate start time for request
   var endTime = momentTz().tz("Asia/Colombo").format().toString(); // Generate End time for request

   // console.log(startTime + " to " + endTime);

   var URL = "http://geoservice.ist.supsi.ch/4onse/wa/istsos/services/lka/operations/getobservation/offerings/temporary" +
      "/procedures/" +
      station +
      "/observedproperties/"
   if (type == 1) {
      URL += // observedProperties.pressure + "," +
         // observedProperties.humidity + "," +
         // observedProperties.temperature + "," +
         // observedProperties.rainfall + "," +
         // observedProperties.windDirection + "," +
         // observedProperties.solarLight + "," +
         // observedProperties.soilmoisture + "," +
         // observedProperties.temperatureInternal + "," +
         observedProperties.windVelocity
   }
   else if (type == 2) {
      URL += observedProperties.waterheight
   }
   else if (type == 3) {
      URL += observedProperties.waterdischarge
   }
   else {
      callback(true, null);
   }
   // observedProperties.waterheight +
   URL += "/eventtime/" + startTime + "/" + endTime

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
      else {

         try {
            const result = JSON.parse(body);
            if (result.data == undefined || result.data.length == 0) { // check data is available to read
               console.log("undifined");
               callback(true, null);
               return; // stop function doing futher operations
            }
            // console.dir(result.data[0].result.DataArray.values);

            if (!result.data[0].result.DataArray.values.length) {
               getData(time + 1, station, type, callback);
               //callback(true, null);
               // console.log("no value to send");
            }
            else {
               // momentDateTime = momentTz(result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][0]).tz("Asia/Colombo");
               // console.log(momentDateTime.format("YYYY-MM-DD HH:mm"));
               const data = {
                  //time: momentDateTime.format("HH:mm"),
                  //date: momentDateTime.format("YYYY-MM-DD"),
                  dateTime: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][0],
                  // temperatureInternal: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][1],//
                  // pressure: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][7],//
                  // light: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][5],//
                  // humidity: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][9],//
                  // temperature: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][11],//
                  // windVelocity: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][17],//
                  // rainFall: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][13],//**** */
                  // windDirection: result.data[0].result.DataArray.values[result.data[0].result.DataArray.values.length - 1][15],//
               }
               // console.log(data);
               callback(err, data);
            }
         } catch (error) {
            console.log(error);
            callback(true, null);
         }
      }
   });
}

// :url:callback