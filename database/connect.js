const mongoose = require('mongoose');
const config = require('../config/config');
const update = require('../models/updateStations')

connect = () => {
    mongoose.Promise = global.Promise;
    /**
     * set older vertion settings
     */
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log("connected to database");
            update.update(); // this function can find at models/updateStation
        }
    })
}

module.exports = connect;
