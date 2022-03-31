module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    fields: ['system-number', 'surname', 'forenames', 'dobd'],
    next: 'done'
  },
  'done': {}
};
