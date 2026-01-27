module.exports = (req) => {
  const rawCookie = req.headers.cookie || '';
  const cookies = rawCookie.split(';').map(cookie => cookie.trim());
  const kcAccessPart = cookies.find(c => c.startsWith('kc-access='));

  if(kcAccessPart) {
    return kcAccessPart.split('=')[1].trim() !== '';
  } else {
    return false;
  }
};