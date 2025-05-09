module.exports = {
  'entry-number': {
    type: 'number',
    contentKey: 'marriage-entry-number',
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
  'dom': {
    type: 'date',
    dependent: {
      field: 'entry-number',
      value: ''
    },
    validate: [
      'required',
      'date',
      { type: 'before', arguments: 'today' }
    ]
  }
};
