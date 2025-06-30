module.exports = {
  birthV1: {
    "overview": {
      "header": "Record reference",
      "fields": [
        {
          "path": "id",
          "label": "System number"
        }
      ]
    },
    "child": {
      "header": "Child",
      "fields": [
        {
          "path": "child.prefix",
          "label": "Prefix"
        },
        {
          "path": "child.forenames",
          "label": "Forenames"
        },
        {
          "path": "child.surname",
          "label": "Surname"
        },
        {
          "path": "child.suffix",
          "label": "Suffix"
        },
        {
          "path": "date",
          "label": "Date of birth"
        },
        {
          "path": "child.sex",
          "label": "Sex"
        },
        {
          "path": "child.birthplace",
          "label": "Birth place"
        }
      ]
    },
    "registrar": {
      "header": "Registrar",
      "fields": [
        {
          "path": "registrar.subdistrict",
          "label": "Sub-district"
        },
        {
          "path": "registrar.district",
          "label": "District"
        },
        {
          "path": "registrar.administrativeArea",
          "label": "Administrative area"
        }
      ]
    },
    "informant1": {
      "header": "Informant1",
      "fields": [
        {
          "path": "informant1.qualification",
          "label": "Qualification"
        }
      ]
    },
    "informant2": {
      "header": "Informant2",
      "fields": [
        {
          "path": "informant2.qualification",
          "label": "Qualification"
        }
      ]
    },
    "mother": {
      "header": "Mother",
      "fields": [
        {
          "path": "mother.prefix",
          "label": "Prefix"
        },
        {
          "path": "mother.forenames",
          "label": "Forenames"
        },
        {
          "path": "mother.surname",
          "label": "Surname"
        },
        {
          "path": "mother.suffix",
          "label": "Suffix"
        },
        {
          "path": "mother.birthplace",
          "label": "Birth place"
        },
        {
          "path": "mother.maidenSurname",
          "label": "Maiden surname"
        },
        {
          "path": "mother.marriageSurname",
          "label": "Marriage surname"
        }
      ]
    },
    "father": {
      "header": "Father",
      "fields": [
        {
          "path": "father.prefix",
          "label": "Prefix"
        },
        {
          "path": "father.forenames",
          "label": "Forenames"
        },
        {
          "path": "father.surname",
          "label": "Surname"
        },
        {
          "path": "father.suffix",
          "label": "Suffix"
        },
        {
          "path": "father.birthplace",
          "label": "Birth place"
        }
      ]
    },
    "status": {
      "header": "Status",
      "fields": [
        {
          "path": "status.blocked",
          "label": "Blocked"
        },
        {
          "path": "status.marginalNote",
          "label": "Marginal Note"
        },
        {
          "path": "status.cancelled",
          "label": "Cancelled"
        },
        {
          "path": "status.correction",
          "label": "Correction"
        },
        {
          "path": "status.potentiallyFictitious",
          "label": "Potentially Fictitious"
        },
        {
          "path": "status.reregistration",
          "label": "Re-registration"
        }
      ]
    },
    "otherRegistrations": {
      "header": "Other registrations",
      "fields": [
        {
          "path": "previousRegistration",
          "label": "Previous registration"
        },
        {
          "path": "nextRegistration",
          "label": "Next registration"
        }
      ]
    }
  },
  death: {
    "overview": {
      header: "Death Overview",
      fields: [
        {"path": "id", "label": "System Number"}
      ]
    },
    "deceased": {
      header: "Deceased",
      fields: [
        {"path": "deceased.forenames", "label": "Forenames"},
        {"path": "deceased.surname", "label": "Surname"},
        {"path": "deceased.aliases", "label": "Aliases"},
        {"path": "deceased.dateOfBirth", "label": "Date of Birth"},
        {"path": "deceased.sex", "label": "Sex"},
        {"path": "deceased.address", "label": "Address"},
        {"path": "deceased.dateOfDeath", "label": "Date of Death"},
        {"path": "deceased.dateOfDeathQualifier", "label": "Date of Death Qualifier"}
      ]
    },
    "registration": {
      header: "Registration",
      fields: [
        {"path": "registrar.subdistrict", "label": "Subdistrict"},
        {"path": "registrar.district", "label": "District"},
        {"path": "registrar.administrativeArea", "label": "Administrative Area"},
        {"path": "date", "label": "Date of registration"}
      ]
    },
    "status": {
      header: "Status Information",
      fields: [
        {"path": "status.correction", "label": "Correction"},
        {"path": "status.marginalNote", "label": "Marginal Note"}
      ]
    }
  },
  marriage: {
    "overview": {
      header: "Marriage Overview",
      fields: [
        {"path": "id", "label": "Entry Number"},
        {"path": "dateOfMarriage", "label": "Date of Marriage"},
        {"path": "placeOfMarriage.address", "label": "Place of marriage"}
      ]
    },
    "groom": {
      header: "Partner 1",
      fields: [
        {"path": "groom.forenames", "label": "Forename(s)"},
        {"path": "groom.surname", "label": "Surname"},
        {"path": "groom.address", "label": "Address"}
      ]
    },
    "bride": {
      header: "Partner 2",
      fields: [
        {"path": "bride.forenames", "label": "Forename(s)"},
        {"path": "bride.surname", "label": "Surname"},
        {"path": "bride.address", "label": "Address"}
      ]
    },
    "registration": {
      header: "Registration",
      fields: [
        {"path": "registrar.district", "label": "District"},
        {"path": "registrar.administrativeArea", "label": "Administrative Area"}
      ]
    },
    "status": {
      header: "Status Information",
      fields: [
        {"path": "status.marginalNote", "label": "Marginal Note"}
      ]
    }
  },
  partnership: {
    "overview": {
      header: "Partnership Overview",
      fields: [
        {"path": "id", "label": "Entry Number"},
        {"path": "dateOfPartnership", "label": "Date of civil partnership"},
        {"path": "placeOfPartnership.address", "label": "Place of civil partnership"}
      ]
    },
    "partner1": {
      header: "Partner 1",
      fields: [
        {"path": "partner1.forenames", "label": "Forename(s)"},
        {"path": "partner1.surname", "label": "Surname"},
        {"path": "partner1.address", "label": "Address"}
      ]
    },
    "partner2": {
      header: "Partner 2",
      fields: [
        {"path": "partner2.forenames", "label": "Forename(s)"},
        {"path": "partner2.surname", "label": "Surname"},
        {"path": "partner2.address", "label": "Address"}
      ]
    },
    "registration": {
      header: "Registration",
      fields: [
        {"path": "registrar.district", "label": "District"},
        {"path": "registrar.administrativeArea", "label": "Administrative Area"}
      ]
    },
    "status": {
      header: "Status Information",
      fields: [
        {"path": "status.marginalNote", "label": "Marginal Note"}
      ]
    }
  }
};