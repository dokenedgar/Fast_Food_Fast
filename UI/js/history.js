let tblHistory = document.getElementById('history');
//let url = "";
//console.log(window.location.href );

	fetch('http://localhost:4500/api/v1/orders/'+localStorage.loggedUser)
	.then((resp) => resp.json())
	.then((data) => { 
		let orders = JSON.parse(JSON.stringify(data));
		//let orders = data;
		console.log(orders);
		orders.forEach( function(element, index) {
			
			element.order.forEach( function(elementf, index) {
				let row = tblHistory.insertRow(index+1);
				let orderID = row.insertCell(0);
				let food = row.insertCell(1);
				let quantity = row.insertCell(2);
				let price = row.insertCell(3);
				let dateOrdered = row.insertCell(4);
				let status = row.insertCell(5);

				let url = 'http://localhost:4500/api/v1/'+element.user+'/'+element.orderID;
				localStorage.orderID = element.orderID;

			orderID.innerHTML = "<a href= "+url+">"+element.orderID+"</a>";
				food.innerHTML = elementf.food;
				quantity.innerHTML = elementf.quantity;
				price.innerHTML = elementf.price;
				dateOrdered.innerHTML = new Date();
				status.innerHTML = 'pending';
			});
			

		});
		})
	.catch((err) => console.log(err))



