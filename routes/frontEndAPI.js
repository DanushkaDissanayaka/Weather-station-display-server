
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI');
const locationservice = require('../SUPSIserver/locationset');

const Station = require('../models/station');

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

router.post('/addnewStation', function (req, res, next) {

    let newStation = new Station({
        name: req.body.name,
        id: req.body.id,
        type: req.body.type
    });
    newStation.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                state: true,
                mag: "Station save successfully"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                state: false,
                msg: err.errmsg
            })
        })
});

router.get('/getLstDtaLg', function (req, res, next) {
    Station.find({}).select('name id type ldlog')
        .then(result => {
            // console.log(result)
            res.status(200).json({
                state: true,
                result: result
            })
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({
                state: false,
                msg: err.errmsg
            })
        })
});

/**
 * Update location of the station
 */
router.post('/updateLocation', function (req, res, next) {
    const coordinates = req.body.coordinates;
    const id = req.body.id;
    Station.updateOne({ id: id }, { location: coordinates }, (err, result) => {
        if (err) {
            res.status(500).json({
                state: false,
                msg: err
            });
        }
        else {
            res.status(200).json({
                state: true,
                result: result
            });
        }
    });
    // addlocation();
});

router.get('/location', function (req, res, next) {
    Station.find({}).select('name id type ldlog location')
        .then(result => {
            // console.log(result)
            res.status(200).json({
                state: true,
                result: result
            })
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({
                state: false,
                msg: err.errmsg
            })
        })
})
/***
 * 
 * 
 */

router.post('', function (req, res, next) {
    res.json({ success: true, data: "Hello from server" });
});

module.exports = router;

/**
 * This function was used to 
 * add current stations to the 
 * database
 */
addtemp = () => {
    stationList = [
        { name: "4onse UOM (MOD)", id: "4ONSE_UOM_MOD", type: 1 },
        { name: "Backmegahawaththa (PCB)", id: "BAKMEEGAHAWATHTHA_PCB", type: 1 },
        { name: "Bamunugama (MOD)", id: "BAMUNUGAMA_MOD", type: 1 },
        { name: "Bathalagoda (MOD)", id: "BATHALAGODA_MOD", type: 1 },
        { name: "Daduruoya reservoir dam (PCB)", id: "DADURUOYA_RESERVOIR_DAM_PCB", type: 1 },
        { name: "Gajanageehama (MOD)", id: "GAJANAGGEGAMA_MOD", type: 1 },
        { name: "Gunapala Malalasekara (MOD)", id: "GUNAPALA_MALALASEKARA_MOD", type: 1 },
        { name: "Hakwatuna (PCB)", id: "HAKWATUNA_PCB", type: 1 },
        { name: "Hettipola (PCB)", id: "HETTIPOLA_PCB", type: 1 },
        { name: "Hulugedara (MOD)", id: "HULOGEDARA_MOD", type: 1 },
        { name: "John Kothalawala (MOD)", id: "JOHN_KOTHALAWALA_MOD", type: 1 },
        { name: "Kadapathwehera (PCB)", id: "KEDAPATHWEHERA_PCB", type: 1 },
        { name: "Kimbulanwawa (PCB)", id: "KIMBULANWAWA_PCB", type: 1 },
        { name: "Kokawila (MOD)", id: "KOKKAWILA_MOD", type: 1 },
        { name: "Kubukgete (MOD)", id: "KUBUKGETE_MOD", type: 1 },
        { name: "Lankapura (PCB)", id: "LANKAPURA_PCB", type: 1 },
        { name: "Lyceum (MOD)", id: "LYCEUM_MOD", type: 1 },
        { name: "Meliya (PCB)", id: "MAELIYA_PCB", type: 1 },
        { name: "Malagane (MOD)", id: "MALAGANE_MOD", type: 1 },
        { name: "Madamulla (MOD)", id: "MEDAMULLA_MOD", type: 1 },
        { name: "Paragahadeniya (PCB)", id: "PARAGAHADENIYA_PCB", type: 1 },
        { name: "Polpithigama (MOD)", id: "POLPITHIGAMA_MOD", type: 1 },
        { name: "Porapola (PCB)", id: "PORAPOLA_PCB_2", type: 1 },
        { name: "Rambadagalla (PCB)", id: "RAMBADAGALLA_PCB", type: 1 },
        { name: "S.B Herath (MOD)", id: "SB_HERATH_MOD", type: 1 },
        { name: "Sri Sudaramaramaya (MOD)", id: "SRI_SUDARSHANARAMAYA_MOD", type: 1 },
        { name: "University Of Moratuwa(FIT) PCB", id: "University%20of%20Moratuwa(FIT)PCB", type: 1 },
        { name: "University Of Moratuwa(TCP) PCB", id: "University%20of%20Moratuwa(TCP)PCB", type: 1 },
        { name: "Wlapane (PCB)", id: "WALAPANE_PCB", type: 1 },
        { name: "Wellangiriya (PCB)", id: "WELLANGIRIYA_PCB", type: 1 },
        { name: "Wewala (PCB)", id: "WEWALA_PCB", type: 1 },
        { name: "Withikuliya (MOD)", id: "WITHIKULIYA_MOD", type: 1 },
        { name: "Amunugama", id: "AMUNUGAMA_WL", type: 2 },
        { name: "Thorayaya", id: "THORAYAYA_WL", type: 2 },
        { name: "Deegama", id: "DEEGAMA_WL", type: 2 },
        { name: "Maspoththa", id: "MASPOTHA_WL", type: 2 },
        { name: "Moragoda", id: "MORAGODA_WL", type: 3 },
        { name: "Ridee bandi ella", id: "RIDEE%20BANDI%20ELLA%20ANICUT_WL", type: 2 },
    ]
    stationList.forEach(station => {
        let newStation = new Station(station);
        newStation.save()
            .then(result => {
                console.log("saved " + station.name)
            })
            .catch(err => {
                console.log(err)
            })
    });
}

addlocation = () => {
    const stationList = [
        { name: "4onse UOM (MOD)", id: "4ONSE_UOM_MOD", type: 1 },
        { name: "Backmegahawaththa (PCB)", id: "BAKMEEGAHAWATHTHA_PCB", type: 1 },
        { name: "Bamunugama (MOD)", id: "BAMUNUGAMA_MOD", type: 1 },
        { name: "Bathalagoda (MOD)", id: "BATHALAGODA_MOD", type: 1 },
        { name: "Daduruoya reservoir dam (PCB)", id: "DADURUOYA_RESERVOIR_DAM_PCB", type: 1 },
        { name: "Gajanageehama (MOD)", id: "GAJANAGGEGAMA_MOD", type: 1 },
        { name: "Gunapala Malalasekara (MOD)", id: "GUNAPALA_MALALASEKARA_MOD", type: 1 },
        { name: "Hakwatuna (PCB)", id: "HAKWATUNA_PCB", type: 1 },
        { name: "Hettipola (PCB)", id: "HETTIPOLA_PCB", type: 1 },
        { name: "Hulugedara (MOD)", id: "HULOGEDARA_MOD", type: 1 },
        { name: "John Kothalawala (MOD)", id: "JOHN_KOTHALAWALA_MOD", type: 1 },
        { name: "Kadapathwehera (PCB)", id: "KEDAPATHWEHERA_PCB", type: 1 },
        { name: "Kimbulanwawa (PCB)", id: "KIMBULANWAWA_PCB", type: 1 },
        { name: "Kokawila (MOD)", id: "KOKKAWILA_MOD", type: 1 },
        { name: "Kubukgete (MOD)", id: "KUBUKGETE_MOD", type: 1 },
        { name: "Lankapura (PCB)", id: "LANKAPURA_PCB", type: 1 },
        { name: "Lyceum (MOD)", id: "LYCEUM_MOD", type: 1 },
        { name: "Meliya (PCB)", id: "MAELIYA_PCB", type: 1 },
        { name: "Malagane (MOD)", id: "MALAGANE_MOD", type: 1 },
        { name: "Madamulla (MOD)", id: "MEDAMULLA_MOD", type: 1 },
        { name: "Paragahadeniya (PCB)", id: "PARAGAHADENIYA_PCB", type: 1 },
        { name: "Polpithigama (MOD)", id: "POLPITHIGAMA_MOD", type: 1 },
        { name: "Porapola (PCB)", id: "PORAPOLA_PCB_2", type: 1 },
        { name: "Rambadagalla (PCB)", id: "RAMBADAGALLA_PCB", type: 1 },
        { name: "S.B Herath (MOD)", id: "SB_HERATH_MOD", type: 1 },
        { name: "Sri Sudaramaramaya (MOD)", id: "SRI_SUDARSHANARAMAYA_MOD", type: 1 },
        { name: "University Of Moratuwa(FIT) PCB", id: "University%20of%20Moratuwa(FIT)PCB", type: 1 },
        { name: "University Of Moratuwa(TCP) PCB", id: "University%20of%20Moratuwa(TCP)PCB", type: 1 },
        { name: "Wlapane (PCB)", id: "WALAPANE_PCB", type: 1 },
        { name: "Wellangiriya (PCB)", id: "WELLANGIRIYA_PCB", type: 1 },
        { name: "Wewala (PCB)", id: "WEWALA_PCB", type: 1 },
        { name: "Withikuliya (MOD)", id: "WITHIKULIYA_MOD", type: 1 },
        { name: "Amunugama", id: "AMUNUGAMA_WL", type: 2 },
        { name: "Thorayaya", id: "THORAYAYA_WL", type: 2 },
        { name: "Deegama", id: "DEEGAMA_WL", type: 2 },
        { name: "Maspoththa", id: "MASPOTHA_WL", type: 2 },
        { name: "Moragoda", id: "MORAGODA_WL", type: 3 },
        { name: "Ridee bandi ella", id: "RIDEE%20BANDI%20ELLA%20ANICUT_WL", type: 2 },
    ]
    stationList.forEach(station => {
        locationservice.getlocations(station.id, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(res);
                Station.updateOne({ id: station.id }, { location: res }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(station.id , "Ok");
                    }
                })
            }
        });
    });
}