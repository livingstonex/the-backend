const LocalSubmissionData = require('../data/submissions');

module.exports = {
  getSubmissionsByInstitution: async (institution_id) => {
    /*
    * Probably interact with the Database here to retrieve list of institutions submissions here. 
    * Implement pagination here, and make sure that the DB foreign records are well indexed.
    */

    let submission = [];

    for (let i = 0; i < LocalSubmissionData.length; i++) {
      if (LocalSubmissionData[i].institution_id === institution_id) {
        submission.push(LocalSubmissionData[i]);
      }
    }

    return submission;
  },
};