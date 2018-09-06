let foodName = document.getElementById("foodName");
let lblPrice = document.getElementById("LabelFoodPrice");
let foodPrice = document.getElementById("foodPrice");
let lblDesc = document.getElementById("LabelFoodDesc");
let foodDesc = document.getElementById("foodDesc");
let btngetDetails = document.getElementById("btngetDetails");
let btnUpdateDetails = document.getElementById("btnUpdateDetails");

lblPrice.style.display = 'none';
foodPrice.style.display = 'none';
lblDesc.style.display = 'none';
foodDesc.style.display = 'none';
btnUpdateDetails.style.display = 'none';

function getDetails () {
	let food = foodName.value;
	fetch('https://dokenedgar.herokuapp.com/api/v2/admin/food/'+food)
	.then((resp) => resp.json())
	.then((data) => { 
		let orders = JSON.parse(JSON.stringify(data));
		//let orders = data;
		console.log(orders);
		//orders.forEach( function(element, index) {
			
			orders.forEach( function(elementf, index) {
				foodName.innerHTML = elementf.foodName;
				foodDesc.innerHTML = elementf.foodDesc;
				foodPrice.innerHTML = elementf.foodPrice;

			});

			foodName.readOnly = true;
			foodPrice.readOnly = true;
			foodDesc.readOnly = true;

			lblPrice.style.display = 'block';
			foodPrice.style.display = 'block';
			lblDesc.style.display = 'block';
			foodDesc.style.display = 'block';
			btnUpdateDetails.style.display = 'block';

			btngetDetails.style.display = 'none';

		//});
		})
	.catch((err) => console.log(err))

}

function deleteDetails () {
		let f_name = foodName.value;
		let f_price = foodPrice.value;
		let f_desc = foodDesc.value;
		let signInerrors = document.getElementById('errors');
		
		
				fetch('https://dokenedgar.herokuapp.com/api/v2/admin/deletefood', {
				method:'DELETE',
				headers: {'content-type': 'application/json' },
				body: JSON.stringify({foodName:f_name, foodPrice:f_price, foodDesc:f_desc})
			})
			.then((resp) => {signInerrors.style.color = 'red';
							signInerrors.innerHTML = 'Food deleted successfully' ;})
			.catch((error) => console.log(error))
		
	}