module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    fields: ['system-number', 'surname', 'forenames'],
    next: 'done'
  },
  'done': {}
}
