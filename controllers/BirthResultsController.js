const Controller = require('hmpo-form-wizard').Controller;

class BirthResultsController extends Controller {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      locals.searchTerms = {
        systemNumber: '',
        surname: 'MULTIPLE',
        forenames: 'Tester',
        dob: '01/01/2010'
      }
      locals.searchResults = [
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
