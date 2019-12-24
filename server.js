const express = require('express');
const logger = require('morgan');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const xss = require('xss-clean')
const driverApi = require('./routes/driverRoutes');
const fridgecontentApi = require('./routes/fridgecontentRoutes');
const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false  }));
app.use(expressValidator());
app.use(cors());
app.use(xss());
app.use(helmet());

driverApi(app);
fridgecontentApi(app);

// App Security
app.use(express.json({ limit: '10kb' })); 
// const limit = rateLimit({
//     max: 100,// max requests
//     windowMs: 60 * 60 * 1000, // 1 Hour
//     message: 'Too many requests' // message to send
// });
// app.use('/register', limit); // Setting limiter on specific route 
// //app.use(limiter); //  apply to all requests if you want


app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

app.listen(5000, () => console.log("App listening on port 5000!"));

module.exports = app;
