module.exports = {
  'system-number': {
    type: 'number',
    contentKey: 'birth-system-number',
    attributes: {
      autofocus: true
    }
  },
  'surname': {
    type: 'text'
  },
  'forenames': {
    type: 'text'
  },
  'dob': {
    type: 'date',
    validate: 'date'
  }
};
