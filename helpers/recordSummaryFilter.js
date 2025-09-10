/**
 * A function that applies the FLS schema to a record removing any unauthorised fields.
 *
 * @param permissions The FLS schema against the Organisation for the required dataset.
 * @param record the record of an event, returned from the api
 * @returns '{}' Record with filtered out fields according to flsSchema
 */

const config = require("../config");
const { fls } = require("../config");

module.exports.recordSummaryFilter = (permissions, record) => {
  if (!config.fls.enabled) { return record }

  const getNestedValue = (obj, pathArray) => {
    return pathArray.reduce((acc, key) => acc && acc[key], obj);
  }

  const setNestedValue = (obj, pathArray, value) => {
    let current = obj;
    pathArray.forEach((key, index) => {
      if (index === pathArray.length - 1) {
        current[key] = value;
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    });
  }

  const filterRecordByUISchema = (record, schema, ignoreFieldPermissions = []) => {
    const filtered = {};

    // Include ignoreFieldPermissions fields directly
    fls?.ignoreFieldPermissions?.forEach(field => {
      const pathArray = Array.isArray(field) ? field : field.split('.');
      const value = getNestedValue(record, pathArray);
      if (value !== undefined) {
        setNestedValue(filtered, pathArray, value);
      }
    });

    // Include schema-defined fields where ui is true and value exists in record
    schema.forEach(({ field, ui }) => {
      if (!ui) return;
      const pathArray = field.split('.');
      const value = getNestedValue(record, pathArray);
      if (value !== undefined) {
        setNestedValue(filtered, pathArray, value);
      }
    });

    return filtered;
  };

  return filterRecordByUISchema(record, permissions, fls.ignoreFieldPermissions)
}
