
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI')


router.get('/uomTCPPCB', function (req, res, next) {
    supsiServer.getdata((err, data) => {
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