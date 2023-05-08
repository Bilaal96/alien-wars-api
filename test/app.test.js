import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import { seedDB } from "../db/seed.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Character from "../models/Character.js";
import { Shop } from "../models/Shop.js";

//Assertion Style
chai.should();

chai.use(chaiHttp);

beforeEach(async () => {
  await seedDB();
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
        .end((err, res) => {
          res.should.have.status(200);
          const { msg } = res.body;
          msg.should.be.a("string");
          msg.should.equal("Test endpoint");
          done();
        });
    });
  });
  describe("POST a new user", () => {
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
          const { user } = res.body;
          user.should.have.property("_id");
          user.should.have.property("username").equal(userData.username);
          // res.body.user.should.have.property("email").equal(userData.email);
          user.should.have.property("password");
          done();
        });
    });
  });
  describe("POST a new character", () => {
    it("should create a new character with valid properties", function (done) {
      this.timeout(5000);
      // Define character data
      const characterData = {
        username: "testuser2",
        characterName: "testHuman",
        race: "human",
      };

      // Send POST request to create character
      chai
        .request(server)
        .post("/api/characters/create")
        .send(characterData)
        .end((err, res) => {
          // Check response status
          res.should.have.status(201);

          // Check response body
          res.body.should.be.a("object");
          const { character } = res.body;
          character.should.have
            .property("username")
            .that.is.a("string")
            .equal(characterData.username);
          character.should.have
            .property("characterName")
            .that.is.a("string")
            .equal(characterData.characterName);
          character.should.have
            .property("race")
            .that.is.a("string")
            .equal(characterData.race);
          character.should.have.property("gold").that.is.a("number").equal(100);
          character.should.have
            .property("attack")
            .that.is.a("number")
            .equal(100);
          character.should.have
            .property("defense")
            .that.is.a("number")
            .equal(120);

          done();
        });
    });
  });
  describe("GET all characters", () => {
    it("should fetch an array of all characters in the database", (done) => {
      chai
        .request(server)
        .get("/api/characters")
        .end((err, res) => {
          const { characters } = res.body;
          // Check response status
          res.should.have.status(200);
          // Check response body
          characters.should.be.a("array");
          characters.map((character) => {
            character.should.have.property("username").that.is.a("string");
            character.should.have.property("characterName").that.is.a("string");
            character.should.have.property("race").that.is.a("string");
            character.should.have.property("gold").that.is.a("number");
            character.should.have.property("attack").that.is.a("number");
            character.should.have.property("defense").that.is.a("number");
          });
          done();
        });
    });
  });
  describe("GET items", () => {
    it("should fetch an array of all items in the database", (done) => {
      chai
        .request(server)
        .get("/api/shop")
        .end((err, res) => {
          const { shopItems } = res.body;
          // Check response status
          res.should.have.status(200);
          // Check response body
          shopItems.should.be.a("array");
          shopItems.map((item) => {
            item.should.have.property("type").that.is.a("string");
            item.should.have.property("itemName").that.is.a("string");
            item.should.have.property("attackStat").that.is.a("number");
            item.should.have.property("defenceStat").that.is.a("number");
            item.should.have
              .property("buff")
              .that.satisfies((val) => val === null || typeof val === "string");
            item.should.have.property("cost").that.is.a("number");
          });
          done();
        });
    });
    it("should fetch a single item from a given id", (done) => {
      const newItem = new Shop({
        type: "testType",
        itemName: "Test Item",
        attackStat: 10,
        defenceStat: 0,
        buff: "strength",
        cost: 100,
      });

      newItem.save();

      chai

        .request(server)
        .get(`/api/shop/${newItem.id}`)
        .end((err, res) => {
          const { item } = res.body;
          item.should.have.property("type").that.equals("testType");
          item.should.have.property("itemName").that.equals("Test Item");
          item.should.have.property("attackStat").that.equals(10);
          item.should.have.property("defenceStat").that.equals(0);
          item.should.have.property("buff").that.equals("strength");
          item.should.have.property("cost").that.equals(100);
          done();
        });
    });
  });
});
