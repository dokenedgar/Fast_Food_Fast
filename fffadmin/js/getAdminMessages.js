let tblHistory = document.getElementById('inbox');

	fetch('https://dokenedgar.herokuapp.com/api/v2/admin/messages/')
	.then((resp) => resp.json())
	.then((data) => { 
		let orders = JSON.parse(JSON.stringify(data));
		//let orders = data;
		console.log(orders);
		//orders.forEach( function(element, index) {
			
			orders.forEach( function(elementf, index) {
				let row = tblHistory.insertRow(index+1);
				let serialNum = row.insertCell(0);
				let sender = row.insertCell(1);
				let message = row.insertCell(2);
				let dateReceived = row.insertCell(3);
				//let price = row.insertCell(3);
				//let dateOrdered = row.insertCell(4);
				//let status = row.insertCell(5);

				

				serialNum.innerHTML = index+1;
				sender.innerHTML = elementf.sender;
				message.innerHTML = elementf.message;
				dateReceived.innerHTML = new Date().toUTCString();
			});
			

		//});
		})
	.catch((err) => console.log(err))

function sendAdminMsg () {
	let name = document.getElementById('msgName').value;
	let msg = document.getElementById('txtMsg').value;
	if (name.length < 2 || msg < 5) {
		signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
	}else {
		fetch('https://dokenedgar.herokuapp.com/api/v2/admin/messages', {
			method:'POST',
			headers: {'content-type': 'application/json' },
			body: JSON.stringify({receiver:name, message:msg})
		})
		.then((resp) => {signInerrors.style.color = 'green';
						signInerrors.innerHTML = 'Message sent successfully' ;})
		.catch((error) => console.log(error))
	}
}

