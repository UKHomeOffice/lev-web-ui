const { jwtDecode } = require("jwt-decode");

module.exports = (req) => {
  const rawCookie = req.headers.cookie || '';
  const cookies = rawCookie.split(';').map(cookie => cookie.trim());
  const kcAccessPart = cookies.find(c => c.startsWith('kc-access='));
  const decoded = jwtDecode(kcAccessPart);

  return decoded.exp;
};
