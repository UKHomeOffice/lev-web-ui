// this extracts the current user from the request - it could come from many places - e.g. local env files, gatekeeper or adapter, hence the chain

module.exports = (req) => {
  console.log("***API USER: " + process.env.API_USER);
  console.log("***REQUEST CONDITION: " + !req);
  if (!req) {
    return process.env.IAM_USER || '';
  }
  console.log("***HEADER ORIGINAL USERNAME: " + req.header('x-original-username'));
  console.log("***HEADER AUTH USERNAME: " + req.header('x-auth-username'));
  return req.header('x-original-username') || req.header('x-auth-username') || process.env.IAM_USER || '';
};