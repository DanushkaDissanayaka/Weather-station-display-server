
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI')
const station = require("../SUPSIserver/stations")


router.get('/uomTCPPCB', function (req, res, next) {
    supsiServer.getDisplayData(station.UniversityOfMoratuwaTCPPCB, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        else {
            data.success = true;
            res.json(data);
        }
    });
});

router.get('/uomFITPCB', function (req, res, next) {
    supsiServer.getDisplayData(station.UniversityOfMoratuwaFITPCB, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        else {
            data.success = true;
            res.json(data);
        }
    });
});

router.get('/backmegahawaththaPCB', function (req, res, next) {
    supsiServer.getDisplayData(station.BAKMEEGAHAWATHTHA, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        else {
            data.success = true;
            res.json(data);
        }
    });
});

router.post('/dataWithStName', function (req, res, next) {
    const stationName = req.body.station;
    
    supsiServer.getDisplayData(stationName, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        else {
            data.success = true;
            res.json(data);
        }
    });
});

router.get('', function (req, res, next) {
    res.json({ success: true, data: "Hello from server" });
});

module.exports = router;