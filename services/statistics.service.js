const LocalSubmissionData = require('../data/submissions');
const LocalInstitutionData = require('../data/institutions');

module.exports = {
  getBestInstitutionForSubject: async (subject) => {
    let result;
    let numberOfAcademicPapers = 0;
    let bestInstitutionId;
  
    for(let i = 0; i < LocalSubmissionData.length; i++) {
        for (let item of LocalSubmissionData[i].subjects) {
          if (item.name.toUpperCase() === subject.toUpperCase()){
            if (item.academic_papers > numberOfAcademicPapers) {
              numberOfAcademicPapers = item.academic_papers;
              bestInstitutionId = LocalSubmissionData[i].institution_id;
            }
          }
        }
    }

    for (let i = 0; i < LocalInstitutionData.length; i++) {
      if (LocalInstitutionData[i].id === bestInstitutionId) {
        result = LocalInstitutionData[i].name;
      }
    }

    return result;
  },
}
