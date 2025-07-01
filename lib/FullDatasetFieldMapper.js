module.exports = {
  birthV1: {
    "overview": {
      "header": "Record reference",
      "fields": [
        { "path": "id", "label": "System Number" }
      ]
    },
    "child": { "header": "Child details",
      "fields": [
        { "path": "child.surname", "label": "Last name" },
        { "path": "child.forenames", "label": "First and middle names" },
        { "path": "date", "label": "Date of birth" },
        { "path": "child.sex", "label": "Sex" },
        { "path": "child.birthplace", "label": "Place of birth" }
      ]
    },
    "mother": {
      "header": "Mother",
      "fields": [
        { "path": "mother.surname", "label": "Surname" },
        { "path": "mother.forenames", "label": "Forenames" },
        { "path": "mother.maidenSurname", "label": "Maiden name" },
        { "path": "mother.marriageSurname", "label": "Last name at marriage" },
        { "path": "mother.birthplace", "label": "Place of birth" }
      ]
    },
    "father": {
      "header": "Father",
      "fields": [
        { "path": "father.surname", "label": "Surname" },
        { "path": "father.forenames", "label": "Forenames" },
        { "path": "father.birthplace", "label": "Place of birth" }
      ]
    },
    "registration": {
      "header": "Registration details",
      "fields": [
        { "path": "registrar.district", "label": "Registration District" },
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
        {"path": "id", "label": "System Number"}
      ]
    },
    "deceased": {
      header: "Deceased details",
      fields: [
        // {"path": "deceased.surname", "label": "Surname"},
        // {"path": "deceased.forenames", "label": "Forenames"},
        {"path": "deceased.dateOfBirth", "label": "Date of Birth"},
        {"path": "deceased.sex", "label": "Sex"},
        {"path": "deceased.address", "label": "Address"},
        {"path": "deceased.dateOfDeath", "label": "Date of Death"}
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
        {"path": "id", "label": "System or Entry number"},
      ]
    },
    "details": {
      header: "Marriage details",
      fields: [
        {"path": "dateOfMarriage", "label": "Date of Marriage"},
        {"path": "placeOfMarriage.address", "label": "Place of marriage"}
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
        {"path": "registrar.administrativeArea", "label": "Administrative Area"}
      ]
    }
  },
  partnership: {
    "overview": {
      header: "Record reference",
      fields: [
        {"path": "id", "label": "Entry Number"}
      ]
    },
    "details": {
      header: "Civil partnership details",
      fields: [
        {"path": "dateOfPartnership", "label": "Date of civil partnership"},
        {"path": "placeOfPartnership.address", "label": "Place of civil partnership"}
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
    },
    "registration": {
      header: "Registration details",
      fields: [
        {"path": "registrar.district", "label": "District"},
        {"path": "registrar.administrativeArea", "label": "Administrative Area"}
      ]
    }
  }
};