
const express = require('express');
const router = express.Router();
const supsiServer = require('../SUPSIserver/SUPSIserverAPI')


router.get('/uomTCPPCB',function(req,res,next){
    supsiServer.getdata((err,data)=>{
        if (err){
            res.json({success:false});
        }
        res.json({success:true , data:data});
    });
});

module.exports = router;