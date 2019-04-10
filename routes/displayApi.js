
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI')
const station = require("../SUPSIserver/stations")


router.get('/uomTCPPCB', function (req, res, next) {
    supsiServer.getdata(station.UniversityOfMoratuwaTCPPCB, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        res.json({ success: true, data: data });
    });
});

router.get('/uomFITPCB', function (req, res, next) {
    supsiServer.getdata(station.UniversityOfMoratuwaFITPCB, (err, data) => {
        if (err) {
            res.json({ success: false });
        }
        res.json({ success: true, data: data });
    });
});

router.get('', function (req, res, next) {
    res.json({ success: true, data: "Hello from server" });
});

module.exports = router;