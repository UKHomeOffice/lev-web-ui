const completeUIMapper = require('../../../lib/FullDatasetFieldMapper');
const {optimiseForUserManagementRender} = require('../../../helpers/FlsSchemaHelpers');

describe('optimiseForUserManagementRender', () => {
  it('marks fields as permitted or not for UI/API', () => {
    const schemaData = {
      birthV1: [
        {field: 'child.forenames', ui: true, api: false},
        {field: 'child.surname', ui: false, api: true},
        {field: 'child.alias', ui: true, api: true},
        {field: 'informant1.qualification', ui: false, api: false}
      ]
    };
    const result = optimiseForUserManagementRender(completeUIMapper, schemaData);
    // Check child section fields
    expect(result.birthV1.child.fields.find(f => f.path === 'child.forenames').computed_status_ui).toBe(true);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.forenames').computed_status_api).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.surname').computed_status_ui).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.surname').computed_status_api).toBe(true);
    // Fields not in schemaData should default to false
    expect(result.birthV1.child.fields.find(f => f.path === 'child.dateOfBirth').computed_status_ui).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.dateOfBirth').computed_status_api).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.sex').computed_status_ui).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.sex').computed_status_api).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.birthplace').computed_status_ui).toBe(false);
    expect(result.birthV1.child.fields.find(f => f.path === 'child.birthplace').computed_status_api).toBe(false);
    // Check registration section fields
    const regFields = result.birthV1.registration.fields;
    expect(regFields.find(f => Array.isArray(f.path) && f.path.includes('informant1.qualification')).computed_status_ui).toBe(false);
    expect(regFields.find(f => Array.isArray(f.path) && f.path.includes('informant1.qualification')).computed_status_api).toBe(false);
    // Other registration fields should default to false
    expect(regFields.find(f => f.path === 'registrar.district').computed_status_ui).toBe(false);
    expect(regFields.find(f => f.path === 'registrar.district').computed_status_api).toBe(false);
    expect(regFields.find(f => f.path === 'registrar.subdistrict').computed_status_ui).toBe(false);
    expect(regFields.find(f => f.path === 'registrar.subdistrict').computed_status_api).toBe(false);
    expect(regFields.find(f => f.path === 'registrar.administrativeArea').computed_status_ui).toBe(false);
    expect(regFields.find(f => f.path === 'registrar.administrativeArea').computed_status_api).toBe(false);
    expect(regFields.find(f => f.path === 'date').computed_status_ui).toBe(false);
    expect(regFields.find(f => f.path === 'date').computed_status_api).toBe(false);
  });

  it('returns all fields as not permitted if schemaData is empty', () => {
    const schemaData = {};
    const result = optimiseForUserManagementRender(completeUIMapper, schemaData);
    expect(result.birthV1.child.fields[0].computed_status_ui).toBe(false);
    expect(result.birthV1.child.fields[0].computed_status_api).toBe(false);
    expect(result.birthV1.child.fields[1].computed_status_ui).toBe(false);
    expect(result.birthV1.child.fields[1].computed_status_api).toBe(false);
    expect(result.birthV1.registration.fields[0].computed_status_ui).toBe(false);
    expect(result.birthV1.registration.fields[0].computed_status_api).toBe(false);
  });
  it('handles mixed valid and invalid schema entries', () => {
    const schemaData = {
      birthV1: [
        {field: 'child.forenames', ui: true, api: false},
        {field: null, ui: true, api: true},
        {field: 'child.unknown', ui: true, api: true},
        // Invalid ui/api values. Should default to false
        {field: 'child.birthplace', ui: "invalid", api: 1},
      ]
    };
    const result = optimiseForUserManagementRender(completeUIMapper, schemaData);
    const forenamesField = result.birthV1.child.fields.find(f => f.path === 'child.forenames');
    const surnameField = result.birthV1.child.fields.find(f => f.path === 'child.surname');
    const birthplaceField = result.birthV1.child.fields.find(f => f.path === 'child.birthplace');
    expect(forenamesField.computed_status_ui).toBe(true);
    expect(forenamesField.computed_status_api).toBe(false);
    expect(surnameField.computed_status_ui).toBe(false);
    expect(surnameField.computed_status_api).toBe(false);
    expect(birthplaceField.computed_status_ui).toBe(false);
    expect(birthplaceField.computed_status_api).toBe(false);
  });
});
