module.exports = (req) => {
  const params = ['page', 'perPage', 'sort', 'order', 'searchTerm']
    .filter(param => req.query[param])
    .map(param => `${param}=${req.query[param]}`)
    .join('&');

  return params ? `?${params}` : '';
}
