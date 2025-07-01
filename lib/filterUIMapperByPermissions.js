function filterUIMapperByPermissions(permissions, completeUIMapper) {
    const allowedUIFieldsByRecordType = {};

    Object.entries(permissions).forEach(([recordType, permissionGroups]) => {
        if (recordType === "birthV0") return;

        allowedUIFieldsByRecordType[recordType] = new Set();

        Object.values(permissionGroups).flat().forEach(permission => {
            // this will likely need to be parameterised/re-used for the search results
            // if (permission.ui === true)
            if (permission?.field) {
                allowedUIFieldsByRecordType[recordType].add(permission.field);
            }
        });
    });

    const filteredMapper = {};

    Object.entries(completeUIMapper).forEach(([recordType, sections]) => {
        const allowedFields = allowedUIFieldsByRecordType[recordType];
        if (!allowedFields) return;

        const filteredSections = {};

        Object.entries(sections).forEach(([sectionKey, section]) => {
            if (!Array.isArray(section.fields)) return;

            const filteredFields = section.fields.filter(field => {
                if (Array.isArray(field.path)) {
                    return field.path.every(paths => allowedFields.has(paths));
                } else {
                    return allowedFields.has(field.path);
                }
            });

            if (filteredFields.length > 0) {
                filteredSections[sectionKey] = {
                    header: section.header,
                    fields: filteredFields
                };
            }
        });

        if (Object.keys(filteredSections).length > 0) {
            filteredMapper[recordType] = filteredSections;
        }
    });

    return filteredMapper;
}


module.exports = filterUIMapperByPermissions;
