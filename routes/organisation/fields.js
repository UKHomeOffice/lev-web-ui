module.exports = {
  'firstName': {
    type: 'text',
    validate: [
      'required',
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 30 }
    ]
  },
  'lastName': {
    type: 'text',
    validate: [
      'required',
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 30 }
    ]
  },
  'email': {
    type: 'text',
    validate: [
      'email',
      'required',
      { type: 'length', fn: (e) => e.length >= 3 && e.length <= 254 }
    ]
  },
  'teamSelect': {
    type: 'select',
    validate: [
      'required'
    ]
  }
};