const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const port       = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get('/', function(req, res){
    res.send('Hello Express.js');
});

app.get('/hello', function(req, res){
    res.send('Hello stranger !');
});

app.get('/hello/:name', function(req, res){
    let name = req.params.name;
    res.send(`Hello, ${name} !`);
});

/*
/sub/[something] or /sub/[something]/[something]
 */
app.all([/\/sub\/.*/, /\/sub\/.*\/.*/], function(req, res){
    res.send(`You requested URI: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
});

app.post('/post', function(req, res, next){
    if (!req.header("Key")){
        res.sendStatus(401);
    }
    next();
});

app.post('/post', function(req, res){
    if (Object.keys(req.body).length == 0)
        res.status(404).send('404 Not Found');
    else
        res.json(req.body);
});

app.use(function(req, res){
    res.status(404).send('404 Not Found');
});

app.use(function(err, req, res, next){
    res.status(500).send('500 Server Error');
});

app.listen(port);