const Station = require('../models/station');
const supsiServer = require('../SUPSIserver/SUPSIserverAPI');
const connect = require('../database/connect')
/**
 *  Update station at every 1 minutes
 */
module.exports.update = () => {
    getStationList((err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result);
            const stations = result
            setInterval(() => {
                stations.forEach(station => {
                    // console.log(station.name);
                    supsiServer.findLastDataLog(1, station.id, station.type, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            Station.updateOne({ id: station.id }, { ldlog: data.dateTime }, (err, result) => {
                                if (err) {
                                    console.log(err);
                                    connect();
                                }
                                else {
                                    console.log("OK : ", station.name);
                                }
                            });
                        }
                    });
                });
            }, 60000);
        }
    });
}
/**
 * 
 */

getStationList = (callback) => {
    Station.find({}).select('name id type ldlog')
        .then(result => {
            // console.log(result);
            callback(null, result);
        })
        .catch(err => {
            // console.log(err);
            callback(err, null);
        });
}
