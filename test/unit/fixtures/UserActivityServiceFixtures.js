const withWeekendsResult = { 'header': [
  {
    'data': '',
  },
  {
    'data': '03-07-2022',
    'isWeekend': true,
  },
  {
    'data': '04-07-2022',
    'isWeekend': false,
  },
  {
    'data': '05-07-2022',
    'isWeekend': false,
  },
  {
    'data': '06-07-2022',
    'isWeekend': false,
  },
  {
    'data': 'Total',
  },
],
'rows': [
  [
    {
      'data': 'Leonardo',
    },
    {
      'data': 0,
      'isWeekend': true,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
    },
  ],
  [
    {
      'data': 'Raphael',
    },
    {
      'data': 0,
      'isWeekend': true,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 2,
      'isWeekend': false,
    },
    {
      'data': 1,
      'isWeekend': false,
    },
    {
      'data': 3,
    },
  ],
  [
    {
      'data': 'Donatello',
    },
    {
      'data': 0,
      'isWeekend': true,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 60,
      'isWeekend': false,
    },
    {
      'data': 24,
      'isWeekend': false,
    },
    {
      'data': 84,
    },
  ],
  [
    {
      'data': 'Michelangelo',
    },
    {
      'data': 1149,
      'isWeekend': true,
    },
    {
      'data': 1153,
      'isWeekend': false,
    },
    {
      'data': 1142,
      'isWeekend': false,
    },
    {
      'data': 1155,
      'isWeekend': false,
    },
    {
      'data': 4599,
    },
  ],
  [
    {
      'data': 'Day totals',
    },
    {
      'data': 1149,
    },
    {
      'data': 1153,
    },
    {
      'data': 1204,
    },
    {
      'data': 1180,
    },
    {
      'data': 4686,
    },
  ]
]
};

const withoutWeekendsResult = { 'header': [
  {
    'data': '',
  },
  {
    'data': '04-07-2022',
    'isWeekend': false,
  },
  {
    'data': '05-07-2022',
    'isWeekend': false,
  },
  {
    'data': '06-07-2022',
    'isWeekend': false,
  },
  {
    'data': 'Total',
  },
],
'rows': [
  [
    {
      'data': 'Leonardo',
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
    },
  ],
  [
    {
      'data': 'Raphael',
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 2,
      'isWeekend': false,
    },
    {
      'data': 1,
      'isWeekend': false,
    },
    {
      'data': 3,
    },
  ],
  [
    {
      'data': 'Donatello',
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 60,
      'isWeekend': false,
    },
    {
      'data': 24,
      'isWeekend': false,
    },
    {
      'data': 84,
    },
  ],
  [
    {
      'data': 'Michelangelo',
    },
    {
      'data': 1153,
      'isWeekend': false,
    },
    {
      'data': 1142,
      'isWeekend': false,
    },
    {
      'data': 1155,
      'isWeekend': false,
    },
    {
      'data': 3450,
    },
  ],
  [
    {
      'data': 'Day totals',
    },
    {
      'data': 1153,
    },
    {
      'data': 1204,
    },
    {
      'data': 1180,
    },
    {
      'data': 3537,
    },
  ]
]
};


const withWeekendsResultWithUserFilter = { 'header': [
  {
    'data': '',
  },
  {
    'data': '03-07-2022',
    'isWeekend': true,
  },
  {
    'data': '04-07-2022',
    'isWeekend': false,
  },
  {
    'data': '05-07-2022',
    'isWeekend': false,
  },
  {
    'data': '06-07-2022',
    'isWeekend': false,
  },
  {
    'data': 'Total',
  },
],
'rows': [
  [
    {
      'data': 'Leonardo',
    },
    {
      'data': 0,
      'isWeekend': true,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
    },
  ],
]};

const withoutWeekendsResultWithUserFilter = { 'header': [
  {
    'data': '',
  },
  {
    'data': '04-07-2022',
    'isWeekend': false,
  },
  {
    'data': '05-07-2022',
    'isWeekend': false,
  },
  {
    'data': '06-07-2022',
    'isWeekend': false,
  },
  {
    'data': 'Total',
  },
],
'rows': [
  [
    {
      'data': 'Leonardo',
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
      'isWeekend': false,
    },
    {
      'data': 0,
    },
  ],
]
};

module.exports = {
  withWeekendsResult,
  withoutWeekendsResult,
  withWeekendsResultWithUserFilter,
  withoutWeekendsResultWithUserFilter
};
