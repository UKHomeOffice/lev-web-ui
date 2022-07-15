const searchSingleRecord = {
  dateFrom: {
    day: '20',
    month: '12',
    year: '2016'
  },
  dateTo: {
    day: '27',
    month: '12',
    year: '2016'
  },
  userFilter: ''
};

const searchMultipleRecords = {
  dateFrom: {
    day: '26',
    month: '12',
    year: '2016'
  },
  dateTo: {
    day: '05',
    month: '01',
    year: '2017'
  },
  userFilter: ''
};

const searchNoRecord = {
  dateFrom: {
    day: '01',
    month: '01',
    year: '1800'
  },
  dateTo: {
    day: '01',
    month: '02',
    year: '1800'
  },
  userFilter: ''
};

const expectedSearchResult = {
  user: 'lev-e2e-test',
  e2e_user: 'pingdom'
};

module.exports = {
  searchSingleRecord,
  searchMultipleRecords,
  searchNoRecord,
  expectedSearchResult,
};
