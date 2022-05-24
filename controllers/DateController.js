'use strict';

const DateControllerMixin = require('hmpo-components').mixins.Date;
const BaseController = require('./BaseController');
const DateController = DateControllerMixin(BaseController);

module.exports = DateController;
