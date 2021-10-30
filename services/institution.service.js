const LocalInstitutionData = require('../data/institutions');
const LocalSubmissionData = require('../data/submissions');

module.exports = {
  getAllInstitutions: async () => {
    /*
    * Probably interact with the Database here to retrieve list of institutions. Implement pagination indexs like this.
    */
    return LocalInstitutionData;
  },

  getInstitution: async (id) => {
    let institution;

    for (let i = 0; i < LocalInstitutionData.length; i++) {
      if (LocalInstitutionData[i].id === id) {
        institution = LocalInstitutionData[i];
        break;
      }
    }

    return institution;
  },

  createInstitution: async (data) => {
    await LocalInstitutionData.push(data);

    return data;
  },

  updateInstitution: async (payload) => {
    let institution;

    for (let i = 0; i < LocalInstitutionData.length; i++) {
      if (LocalInstitutionData[i].id === payload.id) {
        await LocalInstitutionData.pop(LocalInstitutionData[i]);

        await LocalInstitutionData.push(payload);

        institution = payload;
        break;
      }
    }

    return institution
  },

  checkInstitutionForSubject: async (institution_id, subject) => {
    let result;
  
    for(let i = 0; i < LocalSubmissionData.length; i++) {
      if (LocalSubmissionData[i].institution_id === institution_id) {
        for (let item of LocalSubmissionData[i].subjects) {
          if (item.name.toUpperCase() === subject.toUpperCase()){
            result = subject;
          }
        }
      }
    }

    return result;
  },
};