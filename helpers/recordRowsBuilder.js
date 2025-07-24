const config = require("../config");

const { isFieldPermitted, getNestedValue } = require('./FlsSchemaHelpers')

/**
 * A function that applies the FLS schema to a record. It generates rows with only the data that is authorised and in the
 * format required for the templating, to avoid complex rendering in Nunjucks templates which has previously highlighted performance issues.
 *
 * @param mapper The UI mapper containing the fields for the relevant dataset.
 * @param permissions The FLS schema against the Organisation for the required dataset.
 * @param record the record of an event, returned from the api
 * @returns {[]} An array of all data as "rows" to be referenced and rendered in the GOVUK table component
 */

module.exports.recordRowsBuilder = (mapper, permissions, record) => {
  if (!permissions && config.fls.enabled) { return [] }
  return Object.entries(mapper).reduce((acc, [_, value]) => {
    if (!value.fields) return acc;

    const permittedFields = value.fields.filter(item =>
      isFieldPermitted(item.path, permissions)
    );

    if (permittedFields.length === 0) return acc;

    if (value.header) {
      acc.push([{ html: `<h2>${value.header}</h2>`, colspan: 2, classes: "section-head" }]);
    }

    permittedFields.forEach(item => {
      acc.push([
        { text: item.label },
        { html: getNestedValue(record, item.path) }
      ]);
    });
    return acc;
  }, []);
}
