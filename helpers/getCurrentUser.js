// this extracts the current user from the request - it could come from many places - e.g. local env files, gatekeeper or adapter, hence the chain

module.exports = (req) => {
  if (!req) {
    return process.env.IAM_USER || '';
  }
  return req.header('x-original-username') || req.header('x-auth-username') || process.env.IAM_USER || '';
};