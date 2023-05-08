import chai from 'chai';
import 'chai/register-should.js'; // assertion style
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import app from '../index.js';
import { seedDB } from '../db/seed.js';

// Models
import User from '../models/User.js';
import Character from '../models/Character.js';
import Shop from '../models/Shop.js';

chai.use(chaiHttp); // Plugin for integration testing on endpoints

// Reseed before each test
beforeEach(async () => {
  await seedDB();
});

// Close local DB connection after all tests have run
after(async () => {
  await mongoose.connection.close();
});

describe('GET /api - test endpoint', () => {
  it('200: returns an object containing message property with string value of "Welcome to Cosmic Conflict"', async () => {
    // ACT
    const response = await chai.request(app).get('/api');

    // ASSERT
    response.should.have.status(200);
    response.body.should.haveOwnProperty('message');

    const { message } = response.body;
    message.should.be.a('string');
    message.should.equal('Welcome to Cosmic Conflict');
  });
});

/* -------------------------- Auth ------------------------- */
describe('POST /api/auth/signup - register new user', () => {
  it('201: creates & returns a new user with valid credentials', async () => {
    // ARRANGE - Define user data
    const userData = {
      email: 'testuser@example.com',
      username: 'testuser',
      password: 'testpassword',
    };

    // ACT - Send POST request to create user
    const response = await chai
      .request(app)
      .post('/api/auth/signup')
      .send(userData);

    // ASSERT
    response.should.have.status(201);

    const { user } = response.body;
    user.should.be.an('object');
    user.should.haveOwnProperty('_id');
    user.should.haveOwnProperty('username').equal(userData.username);
    user.should.haveOwnProperty('email').equal(userData.email);
  });
});

/* -------------------------- Characters ------------------------- */
describe("POST /api/characters - create user's character", () => {
  it('201: creates & returns a new character with the expected properties', async () => {
    // ARRANGE - Define data required to create a new character
    const characterData = {
      username: 'testuser2', // user to which character belongs
      characterName: 'testHuman',
      race: 'human',
    };

    // ACT - Send POST request to create character
    const response = await chai
      .request(app)
      .post('/api/characters')
      .send(characterData);

    // ASSERT
    response.should.have.status(201);

    const { character } = response.body;
    character.should
      .haveOwnProperty('username')
      .that.is.a('string')
      .equal(characterData.username);

    character.should
      .haveOwnProperty('characterName')
      .that.is.a('string')
      .equal(characterData.characterName);

    character.should
      .haveOwnProperty('race')
      .that.is.a('string')
      .equal(characterData.race);

    character.should.haveOwnProperty('gold').that.is.a('number').equal(100);

    character.should.haveOwnProperty('attack').that.is.a('number').equal(100);

    character.should.haveOwnProperty('defence').that.is.a('number').equal(110);
  });
});

describe('GET /api/characters - get all characters', () => {
  it('200: returns an array of all characters in the database', async () => {
    // ACT
    const response = await chai.request(app).get('/api/characters');

    // ASSERT
    response.should.have.status(200);

    const { characters } = response.body;
    characters.should.be.an('array');
    characters.map((character) => {
      character.should.have.property('username').that.is.a('string');
      character.should.have.property('characterName').that.is.a('string');
      character.should.have.property('race').that.is.a('string');
      character.should.have.property('gold').that.is.a('number');
      character.should.have.property('attack').that.is.a('number');
      character.should.have.property('defence').that.is.a('number');
    });
  });
});

/* -------------------------- Shop ------------------------- */
describe('GET /api/shop - get all shop items', () => {
  it('200: returns an array of all shop items in the database', async () => {
    // ACT
    const response = await chai.request(app).get('/api/shop');

    // ASSERT
    response.should.have.status(200);

    const { shopItems } = response.body;
    shopItems.should.be.a('array');
    shopItems.map((item) => {
      item.should.have.property('type').that.is.a('string');
      item.should.have.property('itemName').that.is.a('string');
      item.should.have.property('attack').that.is.a('number');
      item.should.have.property('defence').that.is.a('number');
      /* item.should.have
        .property('buff')
        .that.satisfies((val) => val === null || typeof val === 'string'); */
      item.should.have.property('cost').that.is.a('number');
    });
  });
});

describe('GET /api/shop/:itemId - get item by :itemId', () => {
  it('200: returns a single item with the given :itemId', async () => {
    // ARRANGE - create an item, so we can access its ID and use it in the API request URL
    const newItem = await Shop.create({
      type: 'testType',
      itemName: 'Test Item',
      attack: 100,
      defence: 0,
      cost: 100,
    });

    // ACT
    const response = await chai.request(app).get(`/api/shop/${newItem.id}`);

    // ASSERT
    const { shopItem } = response.body;
    shopItem.should.have.property('type').that.equals('testType');
    shopItem.should.have.property('itemName').that.equals('Test Item');
    shopItem.should.have.property('attack').that.equals(100);
    shopItem.should.have.property('defence').that.equals(0);
    shopItem.should.have.property('cost').that.equals(100);
  });
});

/* -------------------------- Battle ------------------------- */
