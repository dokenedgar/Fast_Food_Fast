let btnSignin = document.getElementById("buttonSignin");
let btnSignup = document.getElementById("buttonsignup");

function signIn () {
	let username = document.getElementById("txtusername").value;
	let password = document.getElementById("txtpassword").value;

	if (username.lenth < 5 || password.length < 5) {
		window.alert("Input less than 5"); 
	}
	else {
		window.location.href = './dashboard.html';
	}
}

function signUp () {
	let f_name = document.getElementById('txtFname');
	let s_name = document.getElementById('txtSname');
	let phone_Num = document.getElementById('txtPhoneNum');
	let user_name = document.getElementById('txtUsername');
	let password = document.getElementById('txtPassword');
	let signInerrors = document.getElementById('errors');
	let errors = '';
	
	//VALIDATION
	if (f_name.value.length < 1) {
		f_name.style.borderColor = 'red';
		errors = "First name can't be empty<br>"
	}
	else {f_name.style.borderColor = 'green';}

	if (s_name.value.length < 1) {
		s_name.style.borderColor = 'red';
		errors += "Surname can't be empty<br>";
	}
	else {s_name.style.borderColor = 'green';}

	if (phone_Num.value.length < 11) {
		phone_Num.style.borderColor = 'red';
		errors += "Phone number is less than 11<br>";
	}
	else {phone_Num.style.borderColor = 'green';}

	if (user_name.value.length < 5) {
		user_name.style.borderColor = 'red';
		errors += "Username is less than 5<br>";
	}
	else {user_name.style.borderColor = 'green';}

	if (password.value.length < 5) {
		password.style.borderColor = 'red';
		errors += "Password is less than 5<br>";
	}
	else {password.style.borderColor = 'green';}

	if (errors.length > 5 ) {
		signInerrors.innerHTML = errors;
		errors = "";
	}
	else {
		//Send data to server
		fetch('http://localhost:4500/signup', {
			method:'POST',
		    headers : {'content-type': 'application/json' },
			body: JSON.stringify({ fname:f_name.value, sname:s_name.value, phone:phone_Num.value, username:user_name.value, pword:password.value })
		})
		.then((resp) => resp.json())
		.then((data) => { let obj = JSON.parse(JSON.stringify(data));
						 window.location.href = '/api/v1/'+obj.username+'/dashboard.html'
						 })
		.catch((err) => console.log(err))
	}
	
}

function sendMsg () {
	window.location.href = './dashboard.html';
}


function adminsignin (argument) {
	let username = document.getElementById("txtusername").value;
	let password = document.getElementById("txtpassword").value;

	if (username.lenth < 5 || password.length < 5) {
		window.alert("Input less than 5"); 
	}
	else {
		window.location.href = './admindashboard.html';
	}
}
