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

			lblPrice.style.display = 'inline';
			foodPrice.style.display = 'inline';
			lblDesc.style.display = 'inline';
			foodDesc.style.display = 'inline';
			btnUpdateDetails.style.display = 'inline';

			btngetDetails.style.display = 'none';

		//});
		})
	.catch((err) => console.log(err))

}