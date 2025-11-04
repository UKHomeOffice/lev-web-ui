module.exports = {
  'liveNotification': {
    type: 'text',
    validate: [
      'required',
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 150 }
    ]
  },
  'newNotification': {
    type: 'text',
    validate: [
      'required',
      { type: 'length', fn: (e) => e.length <= 150 },
      { type: 'regex', arguments: '^[a-zA-Z:,.?! -]+$'}
    ]
  }
};