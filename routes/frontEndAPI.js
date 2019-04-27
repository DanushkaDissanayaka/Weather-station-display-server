
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI')

router.post('/dataWithStName', function (req, res, next) {
    const stationName = req.body.station;
    
    supsiServer.multipledata(stationName, (err, data) => {
        if (err) {
            res.json([{ success: false }]);
        }
        else {
            data[0].success = true;
            res.json(data);
        }
    });
});

router.post('', function (req, res, next) {
    res.json({ success: true, data: "Hello from server" });
});

module.exports = router;