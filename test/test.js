"use strict";

let request = require('request');
let assert = require('assert');
const expect  = require("chai").expect;
//const { expect } = require('chai');

  describe('a different server', function () {
  	it('checks users', function (done) {

  		request('https://dokenedgar.herokuapp.com/', function (error, response, body) {
  			//expect(body.length).to.be.below(15);
  			expect(response.statusCode).to.equal(200);
  			done();
  		})	
  	});	
  	it('check type of response - should be not be undefined', function (done) {
  		request('http://localhost:4500/users', function (error, response, body) {
  			expect((JSON.stringify(body)).length).to.not.be.undefined;
  			done();
  		})
  	});

});

  describe('Customer Placing A New Order', function () {
  	it('Post customer selections to the server', function (done) {
		  		let options = { 
		  				method: 'POST',
					  url: 'http://localhost:4500/api/v1/:user/placeOrder',
					  headers: {'content-type': 'application/json' },
					  body: 
					   { food: 'Audu',
					     price: 'Maikori',
					     quantity: '2222111114444445'},
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
  		request('http://localhost:4500/api/v1/orders/user', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});

  	it('Check if a users list of orders is found', function (done) {
  		request('http://localhost:4500/api/v1/orders/kate', function (error, response, body) {
  			expect(body).to.not.have.string('food');
  			done();
  		})
  	});

  	  	it('Fetch specific order of a user, using order id', function (done) {
  		request('http://localhost:4500/api/v1/kate/0987kate', function (error, response, body) {
  			expect(body).to.have.string('Food');
  			done();
  		})
  	});

  });

  //SENDING MESSAGE API TEST
  describe('Sending Messages to admin API', function () {
  	
  	it('Page exists - Return status code of 200', function (done) {
  		request('http://localhost:4500/api/v1/user/messages/', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});

  	it('Check if order is found', function (done) {
  		request('http://localhost:4500/api/v1/orders/kate', function (error, response, body) {
  			
  			done();
  		})
  	});
  });

  describe('Admin Login', function () {
  	it('Should be able to reach admin login endpoint', function (done) {
  		request('http://localhost:4500/api/v1/admin', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});

  	it('Test functionality of logging in a user ', function (done) {
		  		let options = { 
		  			  method: 'POST',
					  url: 'http://localhost:4500/api/v1/admin',
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
  		request('http://localhost:4500/api/v1/admin/admindashboard.html', function (error, response, body) {
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
  	});
  });