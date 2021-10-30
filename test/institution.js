let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

var should = chai.should();
var expect = chai.expect; 
chai.use(chaiHttp);

describe('Create an Institution', () => {
  /**
   *  Test Script for the POST: createInstitution route
   */

   it("It should create an Institution.", (done) => {

    const payload = {
      "name": "California State University",
      "address": "P.O. Box 9500, Lake mills street",
      "country": "USA",
      "region": "California"
    }

    chai.request(server)
        .post('/api/v1/institutions')
        .send(payload)
        .end((err, response) => {
          expect(response.body.data.country).to.equal("USA");
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('data');
          // response.body.
          done();
        });
  });
});


describe('Get All Institutions', () => {
   /**
   *  Test Script for the Index: getInstitutions route
   */

   it ("It should get a list of all the institutions.", (done) => {
      chai.request(server)
          .get("/api/v1/institutions")
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');

            done();
          })
   });
});

describe('Get Single Institution', () => {
  /**
  *  Test Script for the Index: getInstitution route
  */

  it ("It should get a single institution.", (done) => {
     chai.request(server)
         .get("/api/v1/institutions/8C8A804F-7A43-5840-4296-8A0117325921")
         .end((err, response) => {
           response.should.have.status(200);
           response.body.should.be.a('object');
           response.body.should.have.property('data');
           expect(response.body.data.country).to.equal("Trinidad and Tobago");
           expect(response.body.data.region).to.equal("Sicilia");
           expect(response.body.data.name).to.equal("Technology Institute");
           expect(response.body.data.address).to.equal("P.O. Box 550, 4768 Consequat Street");
           done();
         })
  });
});


describe('Update an Institution', () => {
  /**
   *  Test Script for the PUT updateInstitution route
   */

   it("It should update an Institution.", (done) => {

    const payload = {
      "name": "Top University of Mathematics",
      "address": "380-7690 Sem Rd.",
      "country": "Germany",
      "region": "Europe",
    }

    chai.request(server)
        .put('/api/v1/institutions/DEA4606B-4A21-D497-40E9-A5FB7589B536')
        .send(payload)
        .end((err, response) => {
          expect(response.body.data.country).to.equal("Germany");
          expect(response.body.data.region).to.equal("Europe");
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('data');
          done();
        });
  });
});

describe('Check institution for Subject', () => {
  /**
   *  Test Script for the GET: checkInstitutionForSubject route
   */

   it("It should check an Institution for a subject.", (done) => {

    const payload = {
      "subject": "Chemistry",
    }

    chai.request(server)
        .get('/api/v1/institutions/EA8BBED7-4106-94AF-48DD-A1414E386AFB/subject')
        .send(payload)
        .end((err, response) => {
          // console.log(response.body)
          expect(response.body.message).to.equal("Successful. This institution has the subject: Chemistry");
          expect(response.body.data).to.equal(payload.subject);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('data');
          done();
        });
  });
});
