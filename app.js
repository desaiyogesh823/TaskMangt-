var express = require('express'),
    app = express(),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/Configuration'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    moment = require('moment');

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
    // next();
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.set('rootDirectory', __dirname); // Set root directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.Promise = global.Promise;
mongoose.connect(config.database.mongodb.url, function (err) {
    if (err) {
        console.log(err);
        process.exit(0);
    } else {
        console.log('Mongodb connected');
    }
});

/**
 * Get port from environment and store in Express.
 */

var port = '2152';
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
server.listen(port);
// require routes files
var routPath = path.join(app.get('rootDirectory'), 'routes');
var files = fs.readdirSync(routPath);
files.forEach(function (file, index) {
    require(path.join(routPath, file))(app);
})

// catch 404 and forward to error handler
app.use('/api/*', function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            success: false,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message,
        error: err
    });
});

module.exports = app;
