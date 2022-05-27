'use strict';

module.exports = {
  // Search criteria for a record that returns single result
  searchSingleRecord: {
    surname: 'Solo',
    forenames: 'Tester',
    day: '29',
    month: '02',
    year: '2012'
  },
  searchMultipleRecords: {
    surname: 'Multiple',
    forenames: 'Tester',
    day: '01',
    month: '01',
    year: '2010'
  },
  // Used for test where only one record should be returned
  validRecord: {
    'id': 999999910,
    'date': '10/10/2014',
    'entryNumber': null,
    'registrar': {
      'signature': null,
      'designation': null,
      'superintendentSignature': null,
      'superintendentDesignation': null,
      'subdistrict': 'Test Subdistrict',
      'district': 'Test District',
      'administrativeArea': 'Reading'
    },
    'informant1': {
      'forenames': null,
      'surname': null,
      'address': null,
      'qualification': 'Mother',
      'signature': null,
      'signatureIsMark': null
    },
    'informant2': {
      'forenames': null,
      'surname': null,
      'address': null,
      'signature': null,
      'signatureIsMark': null
    },
    'child': {
      'originalPrefix': null,
      'forenames': 'Tester',
      'originalForenames': null,
      'surname': 'Solo',
      'originalSuffix': null,
      'dateOfBirth': '29/02/2012',
      'sex': 'Male',
      'birthplace': 'Test Address'
    },
    'mother': {
      'forenames': 'Mum',
      'surname': 'Solo',
      'birthplace': 'Test Birthplace',
      'occupation': null,
      'aliases': [],
      'address': null,
      'maidenSurname': 'prev-Solo',
      'marriageSurname': 'prev-M-Solo'
    },
    'father': {
      'forenames': 'Dad',
      'surname': 'Solo',
      'birthplace': 'Test Birthplace',
      'occupation': null,
      'aliases': [],
      'deceased': null
    },
    'dateOfDeclaration': null,
    'dateOfStatutoryDeclarationOfParentage': null,
    'statutoryDeclarationOfParentage': null,
    'dateOfNameUpdate': null,
    'status': {
      'blocked': false,
      'marginalNote': 'None',
      'cancelled': false,
      'correction': 'None',
      'nameUpdate': null,
      'onAuthorityOfRegistrarGeneral': null,
      'potentiallyFictitious': false,
      'praOrCourtOrder': null,
      'reregistration': 'None'
    }
  },

  // Used for test where multiple records should be returned
  multipleValidRecords: {
    'id': 999999901,
    'date': '10/10/2014',
    'entryNumber': null,
    'registrar': {
      'signature': null,
      'designation': null,
      'superintendentSignature': null,
      'superintendentDesignation': null,
      'subdistrict': 'Test Subdistrict',
      'district': 'Test District',
      'administrativeArea': 'Reading'
    },
    'informant1': {
      'forenames': null,
      'surname': null,
      'address': null,
      'qualification': 'Mother',
      'signature': null,
      'signatureIsMark': null
    },
    'informant2': {
      'forenames': null,
      'surname': null,
      'address': null,
      'signature': null,
      'signatureIsMark': null
    },
    'child': {
      'originalPrefix': null,
      'forenames': 'Tester One',
      'originalForenames': null,
      'surname': 'Multiple',
      'originalSuffix': null,
      'dateOfBirth': '01/01/2010',
      'sex': 'Male',
      'birthplace': 'Test Address'
    },
    'mother': {
      'forenames': 'Mum One',
      'surname': 'Multiple',
      'birthplace': 'Test Birthplace',
      'occupation': null,
      'aliases': [],
      'address': null,
      'maidenSurname': 'prev-Multiple',
      'marriageSurname': 'prev-M-Multiple'
    },
    'father': {
      'forenames': 'Dad One',
      'surname': 'Multiple',
      'birthplace': 'Test Birthplace',
      'occupation': null,
      'aliases': [],
      'deceased': null
    },
    'dateOfDeclaration': null,
    'dateOfStatutoryDeclarationOfParentage': null,
    'statutoryDeclarationOfParentage': null,
    'dateOfNameUpdate': null,
    'status': {
      'blocked': false,
      'marginalNote': 'None',
      'cancelled': false,
      'correction': 'None',
      'nameUpdate': null,
      'onAuthorityOfRegistrarGeneral': null,
      'potentiallyFictitious': false,
      'praOrCourtOrder': null,
      'reregistration': 'None'
    }
  },
  recordsWithFlags: {
    'blocked': 999999920,
    'cancelled': 999999921,
    'caution': 999999922,
    'courtOrder': 999999923,
    'fictitious': 999999924,
    'reRegistered': 999999925,
    'all': 999999926,
    'subsequentlyMarried': 999999930
  }
};

