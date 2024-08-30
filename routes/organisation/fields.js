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
  'teamSelect': {
    type: 'select',
    validate: [
      'required'
    ]
  }
};