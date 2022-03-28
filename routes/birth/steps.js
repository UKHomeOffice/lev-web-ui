module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    fields: ['system-number', 'surname', 'forenames', 'dob'],
    next: 'done'
  },
  'done': {}
};
