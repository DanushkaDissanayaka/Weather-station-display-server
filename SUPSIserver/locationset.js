const Request = require("request");

module.exports.getlocations = function getData(id, callback) {

    const URL = "http://geoservice.ist.supsi.ch/4onse/wa/istsos/services/lka/procedures/" + id + "?_dc=1561874650702"

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
                //  console.log(result.data.location.geometry.coordinates.map(Number));
                callback(false, result.data.location.geometry.coordinates.map(Number));

            } catch (error) {
                console.log(error);
                callback(true, null);
            }
        }
    });
}