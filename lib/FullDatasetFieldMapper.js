module.exports = {
  birthV1: {
    "overview": {
      "header": "Record reference",
      "fields": [
        { "path": "id", "label": "System number" }
      ]
    },
    "child": { "header": "Child details",
      "fields": [
        { "path": "child.surname", "label": "Last name" },
        { "path": "child.forenames", "label": "First and middle names" },
        { "path": "child.dateOfBirth", "label": "Date of birth" },
        { "path": "child.sex", "label": "Sex" },
        { "path": "child.birthplace", "label": "Place of birth" }
      ]
    },
    "mother": {
      "header": "Mother",
      "fields": [
        { "path": ["mother.forenames", "mother.surname"], "label": "Name" },
        { "path": "mother.maidenSurname", "label": "Maiden name" },
        { "path": "mother.marriageSurname", "label": "Last name at marriage" },
        { "path": "mother.birthplace", "label": "Place of birth" }
      ]
    },
    "father": {
      "header": "Father",
      "fields": [
        { "path": ["father.forenames", "father.surname"], "label": "Name" },
        { "path": "father.birthplace", "label": "Place of birth" }
      ]
    },
    "registration": {
      "header": "Registration details",
      "fields": [
        { "path": [ "informant1.qualification", "informant2.qualification" ], "label": "Birth registered by" },
        { "path": "registrar.district", "label": "Registration district" },
        { "path": "registrar.subdistrict", "label": "Sub-district" },
        { "path": "registrar.administrativeArea", "label": "Administrative area" },
        { "path": "date", "label": "Date of registration" }
      ]
    }
  },
  death: {
    "overview": {
      header: "Record reference",
      fields: [
        {"path": "id", "label": "System number"}
      ]
    },
    "deceased": {
      header: "Deceased details",
      fields: [
        {"path": ["deceased.forenames", "deceased.surname"], "label": "Name"},
        {"path": "deceased.dateOfBirth", "label": "Date of birth"},
        {"path": "deceased.sex", "label": "Sex"},
        {"path": "deceased.address", "label": "Address"},
        {"path": ["deceased.dateOfDeathQualifier", "deceased.dateOfDeath"], "label": "Date of death"}
      ]
    },
    "registration": {
      header: "Registration details",
      fields: [
        {"path": "registrar.subdistrict", "label": "Sub-district"},
        {"path": "registrar.district", "label": "District"},
        {"path": "registrar.administrativeArea", "label": "Administrative area"},
        {"path": "date", "label": "Date of registration"}
      ]
    }
  },
  marriage: {
    "overview": {
      header: "Record reference",
      fields: [
        {"path": "id", "label": "System or entry number"},
      ]
    },
    "details": {
      header: "Marriage details",
      fields: [
        {"path": "dateOfMarriage", "label": "Date of marriage"},
        {"path": ["placeOfMarriage.address", "placeOfMarriage.short"], "label": "Place of marriage"}
      ]
    },
    "groom": {
      header: "Partner 1",
      fields: [
        {"path": "groom.surname", "label": "Last name"},
        {"path": "groom.forenames", "label": "First and middle names"},
        {"path": "groom.address", "label": "Address"}
      ]
    },
    "bride": {
      header: "Partner 2",
      fields: [
        {"path": "bride.surname", "label": "Last name"},
        {"path": "bride.forenames", "label": "First and middle names"},
        {"path": "bride.address", "label": "Address"}
      ]
    },
    "registration": {
      header: "Registration details",
      fields: [
        {"path": "registrar.district", "label": "District"},
        {"path": "registrar.administrativeArea", "label": "Administrative area"}
      ]
    }
  },
  partnership: {
    "overview": {
      header: "Record reference",
      fields: [
        {"path": "id", "label": "Entry number"}
      ]
    },
    "details": {
      header: "Civil partnership details",
      fields: [
        {"path": "dateOfPartnership", "label": "Date of civil partnership"},
        {"path": ["placeOfPartnership.address", "placeOfPartnership.short" ], "label": "Place of civil partnership"}
      ]
    },
    "partner1": {
      header: "Partner 1",
      fields: [
        {"path": "partner1.surname", "label": "Last name"},
        {"path": "partner1.forenames", "label": "First and middle names"},
        {"path": "partner1.address", "label": "Address"}
      ]
    },
    "partner2": {
      header: "Partner 2",
      fields: [
        {"path": "partner2.surname", "label": "Last name"},
        {"path": "partner2.forenames", "label": "First and middle names"},
        {"path": "partner2.address", "label": "Address"}
      ]
    }
  }
};