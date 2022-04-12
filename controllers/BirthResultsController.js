'use strict';

const { Controller } = require('hmpo-form-wizard');

class BirthResultsController extends Controller {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      locals.results = [
        {
          surname: 'Multiple',
          forenames: 'Tester One',
          mother: 'Mum One Multiple',
          father: 'Dad One Multiple',
          placeOfBirth: 'Test Address'
        },
        {
          surname: 'Multiple',
          forenames: 'Tester Three',
          mother: 'Mum Three Multiple',
          father: 'Dad Three Multiple',
          placeOfBirth: 'Test Address'
        },
        {
          surname: 'Multiple',
          forenames: 'Tester Two',
          mother: 'Mum Two Multiple',
          father: 'Dad Two Multiple',
          placeOfBirth: 'Test Address'
        }
      ];

      callback(null, locals);
    });
  }
}

module.exports = BirthResultsController;
