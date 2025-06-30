function filterUIMapperByPermissions(permissions, completeUIMapper) {
    const allowedUIFields = new Set();

    // Collect all allowed field paths from nested permissions
    Object.values(permissions).forEach(permissionGroup => {
        Object.values(permissionGroup).flat().forEach(permission => {
            // this will likely need to be parameterised/re-used for the search results
            // if (permission.ui === true)
            if (permission?.field) {
                allowedUIFields.add(permission.field);
            }
        });
    });

    const filteredMapper = {};

    Object.entries(completeUIMapper).forEach(([recordType, sections]) => {
        const filteredSections = {};

        Object.entries(sections).forEach(([sectionKey, section]) => {
            if (!Array.isArray(section.fields)) return;

            const allowedFields = section.fields.filter(field =>
              allowedUIFields.has(field.path)
            );

            if (allowedFields.length > 0) {
                filteredSections[sectionKey] = {
                    header: section.header,
                    fields: allowedFields
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
