import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("tests", () => {
  describe("GET /api", () => {
    it("should return a string of test endpoint", (done) => {
      chai
        .request(server)
        .get("/api")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.msg.should.be.a("string");
          done();
        });
    });
  });
  //TODO complete test for signup
  describe("POST /api/auth/signup", () => {
    it("should return an object with a username and password", (done) => {
      const user = { username: "testing", password: "test123" };
      chai
        .request(server)
        .post("/api/auth/signup")
        .send(user)
        .end((err, response) => {
          console.log(response.body);
        });
      done();
    });
  });
});
