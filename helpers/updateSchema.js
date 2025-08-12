// support function for dealing with fields that are grouped in the ui but treated as separately in schemas
const expandCommaSeparatedKeys = (obj) => {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.includes(',')) {
      const keys = key.split(',').map(k => k.trim());
      for (const k of keys) {
        result[k] = value === 'true';
      }
    } else {
      result[key] = value === 'true';
    }
  }

  return result;
}

// this function converts the updated api/ui fields and combines them into an object consumable by the iam-api
const expandAndCombineSchemas = (ui, api) => {
  const allFields = new Set();

  const expandedUI = expandCommaSeparatedKeys(ui);
  const expandedAPI = expandCommaSeparatedKeys(api);

  Object.keys(expandedUI).forEach(key => allFields.add(key));
  Object.keys(expandedAPI).forEach(key => allFields.add(key));

  return Array.from(allFields).map(field => ({
    field,
    ui: expandedUI[field] ?? null,
    api: expandedAPI[field] ?? null
  }));
}

module.exports = {
  expandAndCombineSchemas
}