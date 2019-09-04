const express = require('express');
const app = express();
const tempApi = require('./services/tempApi');

const url = 'https://pavelili-temps-server.herokuapp.com/';
tempApi(url);

app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/', require('./routes/temperature'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
