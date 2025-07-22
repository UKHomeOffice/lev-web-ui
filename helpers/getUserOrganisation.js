// this extracts the organisation id for a user from the request - it could come from many places - e.g. local env files, gatekeeper or adapter, hence the chain

module.exports = (req) => {
  if (!req) {
    return process.env.ORGANISATION_ID || '';
  }
  return req.header('x-organisation-id') || process.env.ORGANISATION_ID || '';
};