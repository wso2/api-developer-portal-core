const express = require('express');
const app = express();
const config = require('../src/config/config');
const debug = require('debug')('your-app:server');
const crypto = require('crypto');
const exphbs = require('express-handlebars');
const passport = require('passport');
const { copyStyelSheet} = require('./utils/util');
const singleOrgContent = require('./routes/singleOrgContentRoute');



const secret = crypto.randomBytes(64).toString('hex');

app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

if (mode == 'single') {
    //register images and stylesheet folders for single tenante scenario
    app.use('/images', express.static(path.join(__dirname, filePrefix + 'images')));
    app.use('/styles', express.static(path.join(__dirname, filePrefix + '/styles')));

    copyStyelSheet('../../../../src/');
    const folderToDelete = path.join(__dirname, '../../../src/' + '/styles');

    process.on('SIGINT', () => {
        if (fs.existsSync(folderToDelete)) {
            fs.rmSync(folderToDelete, { recursive: true, force: true });
        }
        process.exit();
    });

    process.on('exit', () => {
        if (fs.existsSync(folderToDelete)) {
            fs.rmSync(folderToDelete, { recursive: true, force: true });
        }
    });

    app.use('/', singleOrgContent);

}


Handlebars.registerHelper('eq', function (a, b) {
    return (a == b);
});

Handlebars.registerHelper('in', function (value, options) {
    const validValues = options.hash.values.split(',');
    return validValues.includes(value) ? options.fn(this) : options.inverse(this);
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

//const routes = require('./routes');
const http = require('http');


// Routes setup
//app.use('/api', routes);


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}