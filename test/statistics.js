let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

var should = chai.should();
var expect = chai.expect; 
chai.use(chaiHttp);

describe('Get best institution to study a subject', () => {
  /**
  *  Test Script for the: getBestInstitutionForSubject route
  */

  it ("It should get the best institution to study a subjec.", (done) => {
    
     const payload = {
      "subject": "Chemistry"
     }

     chai.request(server)
         .get("/api/v1/stats/institutions/best")
         .send(payload)
         .end((err, response) => {
           response.should.have.status(200);
           response.body.should.be.a('object');
           response.body.should.have.property('data');
           expect(response.body.data).to.equal("Prestigious Science University");
           done();
         })
  });
});
