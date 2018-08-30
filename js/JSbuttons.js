let btnSignin = document.getElementById("buttonSignin");
let btnSignup = document.getElementById("buttonsignup");

function signIn () {
	let username = document.getElementById("txtusername").value;
	let password = document.getElementById("txtpassword").value;

	if (username.lenth < 5 || password.length < 5) {
		window.alert("Length is less than 5"); 
	}
	else {
		window.location.href = './dashboard.html';
	}
}

function signUp () {
	window.location.href = './dashboard.html';
}

function sendMsg () {
	window.location.href = './dashboard.html';
}