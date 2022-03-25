'use strict';

const express = require('express');
const wizard = require('hmpo-form-wizard');
const steps = require('./steps');
const fields = require('./fields');

const app = express.Router();

app.use(wizard(steps, fields, {
  name: 'birth',
  templatePath: 'pages/birth'
}));

module.exports = app;
