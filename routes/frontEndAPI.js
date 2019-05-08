
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI')

router.post('/dataWithStName', function (req, res, next) {
    const stationName = req.body.station;
    const type = req.body.type;
    if (type == 1) {
        supsiServer.multipledata(stationName, (err, data) => {
            if (err) {
                res.json([{ success: false }]);
            }
            else {
                data[0].success = true;
                res.json(data);
            }
        });
    }
    else if (type == 2 || type == 3) {
        supsiServer.multipledataWL(stationName, type, (err, data) => {
            if (err) {
                res.json([{ success: false }]);
            }
            else {
                data[0].success = true;
                res.json(data);
            }
        });
    }
    else {
        res.json([{ success: false, msg: "no type resived" }]);
    }
});

router.post('/lastDataLog', function (req, res, next) {
    const stationName = req.body.station;
    const type = req.body.type
    var date = 1
    supsiServer.findLastDataLog(date, stationName, type, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        else {
            data.success = true;
            res.json(data);
        }
    });
});

router.post('', function (req, res, next) {
    res.json({ success: true, data: "Hello from server" });
});

module.exports = router;