module.exports = (req, apiConfig) => {
  const token = req.headers['x-auth-token'];
  const roles = req.headers['x-auth-roles'];

  return {
    headers: {
      'x-auth-aud': apiConfig.client,
      'x-auth-username': apiConfig.username,
      ...(token && { Authorization: `Bearer ${token}`}),
      ...(!token && roles && { 'x-auth-roles': roles })
    },
    https: {
      rejectUnauthorized: apiConfig.rejectUnauthorized
    }
  }
};