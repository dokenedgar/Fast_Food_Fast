'use strict';

let request = require('request');
let assert = require('assert');

const expect = require('chai').expect;
// const { expect } = require('chai');

const chai = require('chai');
chai.use(require('chai-http'));
const app = require('../index.js');

describe('test with chai http', function () {
  this.timeout(5000);

  it('api test with chai http', function () {
    return chai.request(app)
      .get('/index')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

/*
let add = require('../example.js');

describe('suite', function () {
  it('expectation', function () {
    assert.equal(add(1,2), 3);
  });
});


describe('a different server', function () {
  it('checks users', function (done) {
    request('https://dokenedgar.herokuapp.com/', function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    })
  });
});
*/
/*
describe('Customer Placing A New Order', function () {
  it('Post customer selections to the server', function (done) {
    let options = {
      method: 'POST',
      url: 'https://dokenedgar.herokuapp.com/api/v1/testuser/placeOrder',
      headers: { 'content-type': 'application/json' },
      body:
        { food: 'Audu',
        price: '345',
        quantity: '1' },
        json: true };

    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    })
  });
  });

  //GETTING SPECIFIC ORDER API TEST
  describe('Fetch A Specific Order', function () {
  	
  	it('Return status code of 200', function (done) {
  		request('https://dokenedgar.herokuapp.com/api/v1/orders/user', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});

  	it('Check if a users list of orders is found', function (done) {
  		request('https://dokenedgar.herokuapp.com/api/v1/orders/kate', function (error, response, body) {
  			expect(body).to.not.have.string('food');
  			done();
  		})
  	});

  	  	it('Fetch specific order of a user, using order id', function (done) {
  		request('https://dokenedgar.herokuapp.com/api/v1/kate/0987kate', function (error, response, body) {
  			expect(body).to.have.string('Food');
  			done();
  		})
  	});

  });

  //SENDING MESSAGE API TEST
  describe('Sending Messages to admin API', function () {
  	
  	it('Page exists - Return status code of 200', function (done) {
  		request('https://dokenedgar.herokuapp.com/api/v1/user/messages/', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});

  	it('Check if order is found', function (done) {
  		request('https://dokenedgar.herokuapp.com/api/v1/orders/kate', function (error, response, body) {
  			
  			done();
  		})
  	});
  });

  describe('Admin Login', function () {
  	it('Should be able to reach admin login endpoint', function (done) {
  		request('https://dokenedgar.herokuapp.com/admin', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});
 
  	it('Test functionality of logging in a user ', function (done) {
		  		let options = { 
		  			  method: 'POST',
					  url: 'https://dokenedgar.herokuapp.com/api/v2/admin',
					  headers: {'content-type': 'application/json' },
					  body: 
					   { uname: 'username',
					     pword: 'password'
					     },
					  json: true };

  		request(options, function (error, response, body) {
  			expect(JSON.parse(JSON.stringify(body)).userFound).to.be.false;
  			done();
  		})
  	});

  	it('Test connectivity to admindashboard.html', function (done) {
  		request('https://dokenedgar.herokuapp.com/api/v2/admin/admindashboard', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});
  });
  */