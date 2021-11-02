const express = require('express');
const cors = require('cors');

const apiRouter = require('./routers/api.router');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
