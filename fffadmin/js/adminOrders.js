let tblHistory = document.getElementById('adminOrders');
	fetch('https://dokenedgar.herokuapp.com/api/v2/admin/orders')
	.then((resp) => resp.json())
	.then((data) => { 
		let orders = JSON.parse(JSON.stringify(data));
		//let orders = data;
		console.log(orders);
		orders.forEach( function(element, index) {
			
			element.order.forEach( function(elementf, index) {
				let row = tblHistory.insertRow(index+1);
				let orderID = row.insertCell(0);
				let userID = row.insertCell(1);
				let food = row.insertCell(2);
				let quantity = row.insertCell(3);
				let price = row.insertCell(4);
				let dateOrdered = row.insertCell(5);
				let status = row.insertCell(6);
				//let updateOrder = row.insertCell(7);

				let url = 'https://dokenedgar.herokuapp.com/api/v2/admin/userorders/'+element.orderID;
				localStorage.orderID = element.orderID;

				orderID.innerHTML = "<a href= "+url+">"+element.orderID+"</a>";
				userID.innerHTML = element.user;
				food.innerHTML = elementf.food;
				quantity.innerHTML = elementf.quantity;
				price.innerHTML = elementf.price;
				dateOrdered.innerHTML = new Date().toUTCString();
				status.innerHTML = '<select ><option value='+element.status+'>'+element.status+'</option></select>';
				//updateOrder.innerHTML = '<a href= '+url+'>Click to update status+</a>';
			});
		});
		})
	.catch((err) => console.log(err))

function updateOrder () {
	// body... 
}

