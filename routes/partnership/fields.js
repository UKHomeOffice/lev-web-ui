module.exports = {
  'entry-number': {
    type: 'number',
    contentKey: 'partnership-entry-number',
    attributes: {
      autofocus: true
    },
    validate: [
      'numeric',
      { type: 'exactlength', arguments: [9] }
    ],
  },
  'surname': {
    type: 'text',
    dependent: {
      field: 'entry-number',
      value: ''
    },
    validate: [
      'required',
      { type: 'maximumlength', fn: (e) => e.length <= 30 }
    ]
  },
  'forenames': {
    type: 'text',
    dependent: {
      field: 'entry-number',
      value: ''
    },
    validate: [
      'required',
      { type: 'maximumlength', fn: (e) => e.length <= 30 }
    ]
  },
  'dop': {
    type: 'date',
    dependent: {
      field: 'entry-number',
      value: ''
    },
    validate: [
      'required',
      'date',
      { type: 'before', arguments: 'today' },
      { type: 'after', arguments: '2005-12-01' }
    ]
  }
};
