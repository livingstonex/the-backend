let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

var should = chai.should();
var expect = chai.expect; 
chai.use(chaiHttp);

describe('Get Submissions by Institutions', () => {
  /**
  *  Test Script for the: getBestInstitutionForSubject route
  */

  it ("It should get a list of submissionsmade by an institution.", (done) => {

     chai.request(server)
         .get("/api/v1/institutions/EA8BBED7-4106-94AF-48DD-A1414E386AFB/submissions")
         .end((err, response) => {
          //  console.log(response.body)
           response.should.have.status(200);
           response.body.data.should.be.an('array');
           response.body.should.have.property('data');
           expect(response.body.data[0].institution_id).to.equal("EA8BBED7-4106-94AF-48DD-A1414E386AFB");
           expect(response.body.data.length).to.equal(2)
           done();
         })
  });
});

