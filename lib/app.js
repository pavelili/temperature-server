const express = require('express');
const app = express();

app.use(express.json());

app.use('/', require('./routes/temperature'));
app.use('/api/v1/temps', require('./routes/temps'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
