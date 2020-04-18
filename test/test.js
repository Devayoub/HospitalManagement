/**
 * E2E test of the Eaton Tech Assessment App - API.
 */

process.env.NODE_ENV = 'test';

require('../app-bootstrap');

const config = require('config');
const mocha = require('mocha');
const coMocha = require('co-mocha');

coMocha(mocha);

describe('HOSPITAL MANAGEMENT APP  - API E2E Test', () => {

  /**
   * Sleep with time from input
   * @param time the time input
   */
  const sleep = time => new Promise((resolve) => {
    setTimeout(resolve, time);
  });

  before(async () => {

    // start the application
    require('../app');




  });

  after(async () => {
 ;
  });

  describe('Service E2E Test', () => {
    // API TEST
   
    require('./user.test');
    require('./auth.test');
    require('./patient.test');
    require('./room.test');
    require('./diseases.test');
  });
});
