module.exports = {
  'dateFrom': {
    type: 'date',
    attributes: {
      autofocus: true
    },
    validate: [
      'date',
      'required'
    ]
  },
  'dateTo': {
    type: 'date',
    validate: [
      'date',
      'required',
      { type: 'before', arguments: 'today' },
      { type: 'afterField', arguments: 'dateFrom'}
    ],
  },
  'userFilter': {
    type: 'text'
  },
  'weekendCheckbox': {
    type: 'checkboxes',
    default: 'checked'
  }
};
