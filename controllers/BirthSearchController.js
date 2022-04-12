'use strict';

const { Controller } = require('hmpo-form-wizard');
const DateControllerMixin = require('hmpo-components').mixins.Date;
const DateController = DateControllerMixin(Controller);

class BirthSearchController extends DateController {
}

module.exports = BirthSearchController
