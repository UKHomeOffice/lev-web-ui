const filterUIMapperByPermissions = require('../../../lib/filterUIMapperByPermissions');

describe('filterUIMapperByPermissions', () => {
  const completeUIMapper = {
    birthV1: {
      overview: {
        header: "Overview",
        fields: [{ path: "id", label: "ID" }]
      },
      child: {
        header: "Child",
        fields: [
          { path: "child.forenames", label: "Forenames" },
          { path: "child.surname", label: "Surname" }
        ]
      }
    },
    death: {
      overview: {
        header: "Overview",
        fields: [{ path: "id", label: "ID" }]
      },
      deceased: {
        header: "Deceased",
        fields: [
          { path: "deceased.forenames", label: "Forenames" },
          { path: "deceased.surname", label: "Surname" }
        ]
      }
    }
  };

  test('filters fields based on permissions', () => {
    const permissions = {
      birthV1: {
        groupA: [
          { field: "child.forenames", ui: true }
        ]
      },
      death: {
        groupB: [
          { field: "deceased.surname", ui: true }
        ]
      }
    };

    const result = filterUIMapperByPermissions(permissions, completeUIMapper);

    expect(result).toEqual({
      birthV1: {
        child: {
          header: "Child",
          fields: [{ path: "child.forenames", label: "Forenames" }]
        }
      },
      death: {
        deceased: {
          header: "Deceased",
          fields: [{ path: "deceased.surname", label: "Surname" }]
        }
      }
    });
  });

  test('returns empty object when permissions are empty', () => {
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
          fields: [{ path: "child.forenames", label: "Forenames" }]
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
          fields: [{ path: "child.forenames", label: "Forenames" }]
        }
      }
    });
  });

  test('ignores fields not in permissions', () => {
    const permissions = {
      birthV1: {
        groupA: [{ field: "nonexistent.field", ui: true }]
      }
    };

    const result = filterUIMapperByPermissions(permissions, completeUIMapper);
    expect(result).toEqual({});
  });

  test('handles mixed valid and invalid permission entries', () => {
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
          header: "Child",
          fields: [{ path: "child.forenames", label: "Forenames" }]
        }
      }
    });
  });
});