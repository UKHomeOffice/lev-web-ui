'use strict';

class BirthSearchService {

  static search({
    _systemNumber,
    surname,
    _forenames,
    _dob
  }) {
    let searchResults = [];

    if (surname === 'Multiple') {
      searchResults = [
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
    } else if (surname === 'Solo') {
      searchResults = [
        {
          surname: 'Solo',
          forenames: 'Tester One',
          mother: 'Mum One Multiple',
          father: 'Dad One Multiple',
          placeOfBirth: 'Test Address'
        }
      ];
    }

    return searchResults;
  }
}

module.exports = BirthSearchService;
