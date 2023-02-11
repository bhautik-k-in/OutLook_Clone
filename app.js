const express = require('express');
const { sendJson } = require('./middlewares/generateResponse');
require('./config/connection');
require('dotenv').config();
const error = require('./middlewares/errors');
const app = express();
app.response.sendJson = sendJson;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/', require('./routes/index.routes.js'));

app.use(error.converter);

app.listen(process.env.PORT || 6000, () => {
    console.log("SERER IS RUNNING ON http://localhost:6000");
});