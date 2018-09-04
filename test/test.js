//let fileTest = require('../index');
let request = require('request');
let assert = require('assert');
const expect  = require("chai").expect;
//const { expect } = require('chai');

  describe('a different server', function () {
  	it('checks users', function (done) {
  		request('http://localhost:4500/users', function (error, response, body) {
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
					   { fname: 'Audu',
					     sname: 'Maikori',
					     phone: '2222111114444445',
					     username: 'auduM',
					     pword: 'Maudu' },
					  json: true };

  		request(options, function (error, response, body) {
  			expect(body).to.contain("perfect");
  			done();
  		})
  	});
  });