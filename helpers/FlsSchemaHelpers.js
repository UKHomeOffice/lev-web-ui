const config = require("../config");
const { fls } = require("../config");

const formatDate = (value) => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }
  return value;
};

const formatAlias = (alias) => {
  if (!alias || !alias.type) return null;
  const parts = [alias.type, alias.prefix, alias.forenames, alias.surname, alias.suffix];
  return parts.filter(Boolean).join(" ").trim();
};

const addDeathAliases = (record) => {
  const aliases = record?.deceased?.aliases || [];
  return aliases.map(formatAlias).filter(Boolean).join("<br>");
};

const resolvePathValue = (record, path) => {
  return path.split('.').reduce((obj, key) => {
    if (key === "placeOfMarriage" && obj[key]?.parish) {
      return { address: `${obj[key].address} in the parish of ${obj[key].parish}` };
    }
    return obj?.[key];
  }, record);
};

const getNestedValue = (record, path) => {
  if (record.status?.blocked && path !== "id") return "UNAVAILABLE";

  const resolveAndFormat = (p) => formatDate(resolvePathValue(record, p));

  if (Array.isArray(path)) {
    const result = path.map(resolveAndFormat);

    const needsAlias = ['deceased.forenames', 'deceased.surname'].every(p => path.includes(p));
    if (record?.deceased?.aliases && needsAlias) {
      result.push("<br>" + addDeathAliases(record));
    }

    return result.join(" ");
  }

  return resolveAndFormat(path);
};

const isFieldPermitted = (itemPath, permissions) => {
  if (!config.fls.enabled) return true;
  if (fls.ignoreFieldPermissions.includes(itemPath)) return true;
  if (Array.isArray(itemPath)) {
    return itemPath.some(path =>
      permissions.some(p => p.field === path && p.ui)
    );
  }
  return permissions.some(p => p.field === itemPath && p.ui);
}

/**
 * A function that applies the FLS schema to the full UI mapper and indicates whether fields are permitted for UI and API rendering.
 * It's optimised for rendering in Nunjucks templates which previously highlighted performance issues.
 *
 * This DOES NOT remove any fields, it only marks them as permitted or not and is intended to display the schema to LEV Administrators.
 *
 * @param fullMapper The full UI mapper containing all datasets and fields.
 * @param schemaData The FLS schema against the Organisation.
 * @returns {{}} An optimised data structure that is much faster to render in Nunjucks
 */
function optimiseForUserManagementRender(fullMapper, schemaData) {

  // these fields should be shown in all cases, so omitted from fields that admins can remove
  const flsIgnoreSections = ["overview"];

  if (!fls.enabled) return {};
  const optimised = {};

  // Loop over the full mapper (all available datasets and fields).
  for (const [dataset, sections] of Object.entries(fullMapper)) {

    // Iterate over this dataset's FLS schema to build a O(1) lookup
    const schemaLookup = {};
    const schemaList = schemaData[dataset] || [];

    schemaList.forEach(item => {
      schemaLookup[item.field] = {
        ui: item.ui,
        api: item.api
      };
    });

    optimised[dataset] = {};

    for (const [sectionKey, section] of Object.entries(sections)) { // Each section mapper (Mother, Registration details etc.)
      // These are 'hard coded' sections of fields that are not part of fls and removed so admins cannot change permissions
      if (!flsIgnoreSections?.includes(sectionKey)) {
      optimised[dataset][sectionKey] = {
        header: section.header,
        fields: section.fields.map(field => {
          let status_ui = false;
          let status_api = false;

          // Handle both single path and array of paths
          const paths = Array.isArray(field.path) ? field.path : [field.path];

          // Check each path against schema
          paths.forEach(path => {
            const schemaEntry = schemaLookup[path];
            if (schemaEntry) {
              if (schemaEntry.ui === true) {
                status_ui = true;
              }
              if (schemaEntry.api === true) {
                status_api = true;
              }
            }
          });

          // Return a more verbose field object with pre-computed statuses
          return {
            ...field,
            computed_status_ui: status_ui,
            computed_status_api: status_api
          };
        })
      };
    }}
  }

  return optimised;
}

module.exports = {
  optimiseForUserManagementRender,
  formatDate,
  formatAlias,
  resolvePathValue,
  getNestedValue,
  isFieldPermitted,
  addDeathAliases
};
