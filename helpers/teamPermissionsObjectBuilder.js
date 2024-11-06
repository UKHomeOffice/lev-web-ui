// Function to convert checkbox array into object consumable by api

module.exports = (permissionsArray) => {
  const templateObject = {
    birth: false,
    death: false,
    marriage: false,
    partnership: false,
    "user-management": false
  };

  return Object.fromEntries(
    Object.keys(templateObject).map(key => [key, permissionsArray.includes(key)])
  );
}
