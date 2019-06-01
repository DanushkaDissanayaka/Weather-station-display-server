const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');

/**
 * set older vertion settings
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.database, {useNewUrlParser: true},(err) =>{
    if (err){
        throw err;
    }
    else{
        console.log("connected to database");
    }
});

mongoose.Promise = global.Promise;

// Routes files
const displayApi = require('./routes/displayApi');
const frontEndApi = require('./routes/frontEndAPI');

app.use(bodyparser.urlencoded({extended:false})); 
app.use(bodyparser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){ 
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});
app.use (express.static(path.join(__dirname,'public')));
//Set Path
app.use('/display',displayApi);
app.use('/frontEnd',frontEndApi);

app.use((req, res, next)=>{
    const error = new Error('Not Founnd');
    error.status(404);
    next(error);
});

app.use((error, req, res, next)=>{  
    res.status(error.status || 500);
    res.json({ 
        error: {
            message: error.message
        }
    });
}); 

module.exports = app;