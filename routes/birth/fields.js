module.exports = {
  'system-number': {
    type: 'text',
    contentKey: 'birth-system-number',
    attributes: {
      autofocus: true,
      classes: 'govuk-input--width-10',
      inputmode: 'numeric',
      attributes: {
        pattern: '[0-9]'
      }
    },
    validate: [
      'numeric',
      { type: 'exactlength', arguments: [9] }
    ],
  },
  'surname': {
    type: 'text',
    dependent: {
      field: 'system-number',
      value: ''
    },
    validate: [
      'required'
    ]
  },
  'forenames': {
    type: 'text',
    dependent: {
      field: 'system-number',
      value: ''
    },
    validate: [
      'required'
    ]
  },
  'dob': {
    type: 'date',
    dependent: {
      field: 'system-number',
      value: ''
    },
    validate: [
      'required',
      'date',
      { type: 'before', arguments: 'today' },
      { type: 'after', arguments: '2009-01-01' }
    ]
  }
};
