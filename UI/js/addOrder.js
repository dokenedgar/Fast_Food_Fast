let Orderbtn = document.getElementById("checkOut_btn");
    		Orderbtn.style.opacity = '0.3';
let lastAddedElement = document.getElementById("foodName");
let parentDiv = document.getElementById("foodName").parentNode;
let item = 0;

//QUANTITY BUTTONS
//let btnplus = document.getElementById("plus");
//let btnminus = document.getElementById("minus");
//let quant = document.getElementById("quantity");
function plus (el) {
	//let current = Number(quant.value);
	// if (current >= 0 ) {
	// 	current+=Number(1);
	// 	quant.value = current;
	 //}
	 window.alert("pk");
}

function minus () {
	let current = Number(quant.value);
	 if (current > 1 ) {
	 	current-=Number(1);
	 	quant.value = current;
	 }
}
//<--------END OF QUANTITY MANIPULATING FUNCTIONS------->
let Element_total = document.getElementById("total");
let totalAmount = 0;
function addToOrder (CheckBoxelement) {
	let foodName = document.getElementById("foodName");
	let checkValue = CheckBoxelement.value;
	let detail = checkValue.split(",");	
	
	if (CheckBoxelement.checked == true) {
		//quant.value = Number(1);
		totalAmount += Number(detail[1]);
		Element_total.value = "Total: "+totalAmount;
		item++;
		let para = document.createElement("P");
		para.setAttribute('id', detail[0]);
		let paraText = document.createTextNode(detail[0]+", Price: "+detail[1]);
		para.appendChild(paraText);
		parentDiv.insertBefore(para, lastAddedElement);
		parentDiv = document.getElementById(detail[0]).parentNode;
		lastAddedElementID = document.getElementById(detail[0]);
		Orderbtn.style.opacity = '1';

		let btnminus = document.createElement("BUTTON");
		btnminus.setAttribute('id', "minus"+detail[0]);
		let minusText = document.createTextNode(" - ");
		btnminus.appendChild(minusText);
		lastAddedElementID.insertAdjacentElement("beforeend",btnminus);

		let quantity = document.createElement("INPUT");
		quantity.setAttribute("id", "Quant"+detail[0]);
		let quanText = 1;//document.createTextNode("1");
		quantity.value = quanText;
		document.getElementById("minus"+detail[0]).insertAdjacentElement("afterend",quantity);

		let btnplus = document.createElement("BUTTON");
		btnplus.setAttribute('id', "plus"+detail[0]);
		//btnplus.setAttribute("onclick", plus("el"));
		let btnText = document.createTextNode(" + ");
		btnplus.appendChild(btnText);
		document.getElementById("Quant"+detail[0]).insertAdjacentElement("afterend",btnplus);

		document.getElementById("plus"+detail[0]).addEventListener("click", function(){
			let quant = document.getElementById("Quant"+detail[0]);
			let current = Number(quant.value);
			if (current >= 0) {
				current+=1;
				quant.value = current;
				totalAmount = totalAmount + Number(detail[1]);
				Element_total.value = "Total: "+totalAmount;
			}
		});
		document.getElementById("minus"+detail[0]).addEventListener("click", function(){
			let quant = document.getElementById("Quant"+detail[0]);
			let current = Number(quant.value);
			if (current > 0) {
				current-=1;
				quant.value = current;
				totalAmount = totalAmount - Number(detail[1]);
				Element_total.value = "Total: "+totalAmount;
			}
		});
		
	}
	else  {
		//quant.value = "";
		item--;
		foodName.innerText = "";
		let quant = document.getElementById("Quant"+detail[0]);
		let current = Number(quant.value);
		totalAmount = totalAmount - (current * Number(detail[1]));
		Element_total.value = "Total: "+totalAmount;
		var element = document.getElementById(detail[0]);
    	element.parentNode.removeChild(element);
    	if (item > 0) {
    		
    	} 
    	else if(item === 0) {
    		Orderbtn.style.opacity = '0.3';
    	}

	}
}

function submitOrderButton () {
	if (item>0) {
		window.location.href = './history.html';
	}
	
}