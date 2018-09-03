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
			//user present
			result.userFound = true;
			//res.send(signInUser);
		}
	});
	res.send(result);
		
});

app.get('/api/v1/:user/dashboard.html', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/dashboard.html'));
});

app.get('/logout', (req,res) => {
	res.sendFile(path.join(__dirname+'/UI/signin.html'));
});

//get users
app.get('/users',(req, res) => {
	res.send(users);
});


app.listen(4500);