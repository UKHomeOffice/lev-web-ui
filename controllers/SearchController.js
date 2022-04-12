'use strict';

const { Controller } = require('hmpo-form-wizard');
const DateControllerMixin = require('hmpo-components').mixins.Date;
const SearchController = DateControllerMixin(Controller);

module.exports = SearchController;
