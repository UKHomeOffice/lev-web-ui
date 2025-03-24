module.exports = {
  'firstName': {
    type: 'text',
    validate: [
      'required',
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 30 },
      { type: 'regex', arguments: '^[a-zA-Z0-9-\' ]+$'}
    ]
  },
  'lastName': {
    type: 'text',
    validate: [
      'required',
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 30 },
      { type: 'regex', arguments: '^[a-zA-Z0-9-\' ]+$'},
    ]
  },
  'email': {
    type: 'text',
    validate: [
      'required',
      { type: 'regex', arguments: /^(?!.*\.\.)[a-z0-9_%+-](?:[a-z0-9._%+'-]*[a-z0-9_%+-])?@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)?\.)+[a-z]{2,6}$/i},
      { type: 'length', fn: (e) => e.length >= 3 && e.length <= 64 }
    ]
  },
'teamSelect': {
    type: 'select',
    validate: [
      'required'
    ]
  },
  'teamName': {
    type: 'text',
    validate: [
      'required',
      { type: 'regex', arguments: '^[a-zA-Z0-9 ]+$'},
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 128 }
    ]
  },
  'permissionCheckboxes': {
    type: 'checkboxes',
    classes: 'govuk-checkboxes--small',
    items: [
      { value: 'user-management'},
      { value: 'birth' },
      { value: 'death' },
      { value: 'marriage'},
      { value: 'partnership'}
    ],
    validate: [
      'required'
    ]
  },
  'organisationName': {
    type: 'text',
    validate: [
      'required',
      { type: 'regex', arguments: '^[a-zA-Z ]+$'},
      { type: 'length', fn: (e) => e.length >= 1 && e.length <= 255 }
    ]
  }
};