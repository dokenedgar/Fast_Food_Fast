let express = require('express');
let app = express();
let path = require('path');

app.use(express.static(__dirname +'/UI/css'));
app.use(express.static(__dirname +'/UI/images/'));
app.use(express.static(__dirname +'/UI/js/'));
app.use(express.json());

let users = [
			{fname: 'Yakubu', sname: 'Frank', phone:'12345678900', username:'Franky', pword:'superfrank'},
			{fname: 'David', sname: 'McKenxie', phone:'09876543211', username: 'McDave', pword: 'pword'}
		];
let adminUsers = [
			{username: 'lionel', password: 'messi'}, 
			{username: 'sergio', password: 'ramos'}, 
			];

let orders = [];
let messagesToAdmin = [];
let messagesFromAdmin = [
				{receiver: 'McDave', message: 'Order received'}, 
				{receiver:'Franky', message:'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service'},
				{receiver: 'Franky', message: 'Order accepted'},
				{receiver:'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us'}
				];


app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/index.html'));
});

app.get('/index.html', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/index.html'));
});

app.get('/signup.html', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/signup.html'));
});

app.post('/signup',(req, res) => {
	const newUser = {
		fname:req.body.fname, sname:req.body.sname, phone:req.body.phone, username:req.body.username, pword:req.body.pword
	};
	users.push(newUser);
	res.send(newUser);

});

app.get('/signin.html', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/signin.html'));
});

app.get('/signin/:uname/:pword',(req, res) => {
	let result = {userFound:false};
	const signInUser = {
		username:req.params.uname, password:req.params.pword
	};
	users.forEach( function(element) {
		if ((element.username === signInUser.username) && (element.pword === signInUser.password)) {
			result.userFound = true;
		}
	});
	res.send(result);
});

//Loggen in user nav
app.get('/api/v1/:user/dashboard', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/dashboard.html'));
});
app.get('/api/v1/:user/orders', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/history.html'));
});
app.get('/api/v1/:user/messages', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/messages.html'));
});

app.post('/api/v1/:user/messages',(req, res) => {
	const newMsg = {
		sender:req.body.sender, message:req.body.message
	};
	messagesToAdmin.push(newMsg);
	res.send(messagesToAdmin);
});

app.get('/api/v1/messages/:user', (req,res) => {
	let msgs = [];
		messagesFromAdmin.forEach( function(element, index) {
		if (element.receiver === req.params.user) {
			msgs = msgs.concat(element);
		}
	});
		res.send(msgs);
});

//GET A USERS ORDERS
app.get('/api/v1/orders/:user', (req,res) => {
	let order = [];
		orders.forEach( function(element, index) {
		if (element.user === req.params.user) {
			order = order.concat(element);
		}
	});
		res.send(order);
});
//GET SPECIFIC USER ORDER USING ORDER ID
app.get('/api/v1/:user/:id', (req,res) => {
		res.sendFile(path.join(__dirname+'/UI/order.html'));
		
});
app.get('/api/v1/orders/:user/:id', (req,res) => {
	let order = [];
		orders.forEach( function(element, index) {
		if (element.orderID === req.params.id) {
			order = order.concat(element);
		}
	});
		res.send(order);
});

//PLACE AN ORDER
app.post('/api/v1/:user/placeOrder', (req,res) => {
	console.log(req.body);
	let order_ID = Math.floor(Math.random() * 12345);
	const newOrder = {
		orderID:order_ID+req.params.user, user:req.params.user, order: req.body
	};
	orders.push(newOrder);
	res.send(orders);

});

app.get('/logout', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/signin.html'));
});

//get users
app.get('/users',(req, res) => {
	res.status(200).send(users);
});



//ADMIN HOMEPAGE
app.get('/api/v1/admin', (req,res) => {
	res.sendFile(path.join(__dirname+'/fffadmin/index.html'));
});
app.post('/api/v1/admin',(req, res) => {
	let result = {userFound:false};
	const signInUser = {
		username:req.body.uname, password:req.body.pword
	};
	adminUsers.forEach( function(element) {
		if ((element.username === signInUser.username) && (element.password === signInUser.password)) {
			result.userFound = true;
		}
	});
	res.send(result);
});

app.get('/api/v1/admin/admindashboard.html', (req,res) => {
	res.sendFile(path.join(__dirname+'/fffadmin/admindashboard.html'));
});

let server = app.listen(4500);

module.exports = server;