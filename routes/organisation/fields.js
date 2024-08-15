module.exports = {
  'firstname': {
    type: 'text',
    validate: [
      'required',
      { type: 'maximumlength', fn: (e) => e.length <= 30 }
    ]
  },
  'lastname': {
    type: 'text',
    validate: [
      'required',
      { type: 'maximumlength', fn: (e) => e.length <= 30 }
    ]
  },
  'teamSelect': {
    type: 'select',
    validate: [
      'required'
    ]
  }
};