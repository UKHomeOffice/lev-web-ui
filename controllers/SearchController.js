'use strict';

const DateControllerMixin = require('hmpo-components').mixins.Date;
const BaseController = require('./BaseController');
const SearchController = DateControllerMixin(BaseController);

module.exports = SearchController;
