const filterUIMapperByPermissions = require('../../../lib/filterUIMapperByPermissions');
const completeUIMapper = require('../../../lib/FullDatasetFieldMapper')

describe('filterUIMapperByPermissions', () => {

  it('filters fields based on permissions', () => {
    const permissions = {
      birthV1: {
        groupA: [
          { field: "child.forenames", ui: true },
          { field: "informant1.qualification", ui: true },
          { field: "informant2.qualification", ui: true }
        ]
      },
      death: {
        groupB: [
          { field: "deceased.surname", ui: true },
          { field: "deceased.forenames", ui: true }
        ]
      },
      marriage: {
        groupC: [
          { field: "registrar.administrativeArea", ui: true }
        ]
      },
      partnership: {
        groupD: [
          { field: "registrar.district", ui: true }
        ]
      }
    };

    const result = filterUIMapperByPermissions(permissions, completeUIMapper);

    expect(result).toEqual({
      birthV1: {
        child: {
          header: "Child details",
          fields: [{ path: "child.forenames", label: "First and middle names" }]
        },
        registration: {
          header: "Registration details",
          fields: [{ path: ["informant1.qualification", "informant2.qualification"], label: "Birth registered by" }]
        }
      },
      death: {
        deceased: {
          header: "Deceased details",
          fields: [
            { path: ["deceased.forenames", "deceased.surname"], label: "Name" }
          ]
        }
      },
      marriage: {
        registration: {
          header: "Registration details",
          fields: [
            { path: "registrar.administrativeArea", label: "Administrative area" },
          ]
        }
      },
      partnership: {
        registration: {
          header: "Registration details",
          fields: [
            { path: "registrar.district", label: "District" },
          ]
        }
      }
    });
  });

  it('returns empty object when permissions are empty', () => {
    const permissions = {};
    const result = filterUIMapperByPermissions(permissions, completeUIMapper);
    expect(result).toEqual({});
  });

  test('ignores sections with no fields array', () => {
    const mapperWithInvalidSection = {
      birthV1: {
        invalidSection: {
          header: "Invalid"
          // no fields
        },
        validSection: {
          header: "Valid",
          fields: [{ path: "child.forenames", label: "First and middle names" }]
        }
      }
    };

    const permissions = {
      birthV1: {
        groupA: [{ field: "child.forenames", ui: true }]
      }
    };

    const result = filterUIMapperByPermissions(permissions, mapperWithInvalidSection);

    expect(result).toEqual({
      birthV1: {
        validSection: {
          header: "Valid",
          fields: [{ path: "child.forenames", label: "First and middle names" }]
        }
      }
    });
  });

  it('ignores fields not in permissions', () => {
    const permissions = {
      birthV1: {
        groupA: [{ field: "nonexistent.field", ui: true }]
      }
    };

    const result = filterUIMapperByPermissions(permissions, completeUIMapper);
    expect(result).toEqual({});
  });

  it('handles mixed valid and invalid permission entries', () => {
    const permissions = {
      birthV1: {
        groupA: [
          { field: "child.forenames", ui: true },
          { field: null, ui: true },
          { field: "child.unknown", ui: true }
        ]
      }
    };

    const result = filterUIMapperByPermissions(permissions, completeUIMapper);

    expect(result).toEqual({
      birthV1: {
        child: {
          header: "Child details",
          fields: [{ path: "child.forenames", label: "First and middle names" }]
        }
      }
    });
  });
});