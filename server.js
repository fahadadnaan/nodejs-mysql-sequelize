const express = require('express');
const logger = require('morgan');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const xss = require('xss-clean')
const driverApi = require('./routes/driverRoutes');
const materialApi = require('./routes/materialRoutes');
const orderApi = require('./routes/orderRoute');
const cool = require('cool-ascii-faces');
const http = require('http');
const app = express();
const server = http.createServer(app);


app.get('/cool', (req, res) => res.send(cool()))



  

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false  }));
app.use(expressValidator());
app.use(cors());
app.use(xss());
app.use(helmet());

driverApi(app);
materialApi(app);
orderApi(app);

app.use(express.json({ limit: '10kb' })); 

app.use(rateLimit); //  apply to all requests if you want


app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

//start our server
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
module.exports = app;
