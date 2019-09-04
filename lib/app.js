const express = require('express');
const app = express();
const getTemps = require('./utils/networkSubscriber');

app.use(express.json());
getTemps();

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/', require('./routes/temperature'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
