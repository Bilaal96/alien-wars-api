import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import { seedDB } from "../db/seed.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Character from "../models/Character.js";

//Assertion Style
chai.should();

chai.use(chaiHttp);
beforeEach(async () => {
  seedDB().then(() => {});
});

after(async () => {
  await mongoose.connection.close();
});

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
  describe("Create a new user", () => {
    it("should create a new user with valid credentials", (done) => {
      // Define user data
      const userData = {
        email: "testuser@example.com",
        username: "testuser",
        password: "testpassword",
      };

      // Send POST request to create user
      chai
        .request(server)
        .post("/api/auth/signup")
        .send(userData)
        .end((err, res) => {
          // Check response status
          res.should.have.status(201);
          // Check response body
          res.body.should.be.a("object");
          res.body.user.should.have.property("_id");

          // Check that user was actually created in MongoDB
          User.findOne({ email: userData.email }).exec((err, user) => {
            user.should.be.a("object");
            user.should.have.property("email").equal(userData.email);
            user.should.have.property("username").equal(userData.username);
            user.should.have.property("password").equal(userData.password);
          });
          done();
        });
    });
  });
  describe("Create a new character", () => {
    it("should create a new character with valid properties", (done) => {
      // Define character data
      const characterData = {
        username: "testuser",
        race: "Human",
        gold: 100,
        attack: 50,
        defense: 25,
      };

      // Send POST request to create character
      chai
        .request(server)
        .post("/api/character/create")
        .send(characterData)
        .end((err, res) => {
          // Check response status
          res.should.have.status(201);

          // Check response body
          res.body.should.be.a("object");
          res.body.should.have
            .property("username")
            .that.is.a("string")
            .equal(characterData.username);
          res.body.should.have
            .property("race")
            .that.is.a("string")
            .equal(characterData.race);
          res.body.should.have
            .property("gold")
            .that.is.a("number")
            .equal(characterData.gold);
          res.body.should.have
            .property("attack")
            .that.is.a("number")
            .equal(characterData.attack);
          res.body.should.have
            .property("defense")
            .that.is.a("number")
            .equal(characterData.defense);
        });
      done();
    });
  });
});
