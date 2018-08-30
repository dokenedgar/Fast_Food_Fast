let Orderbtn = document.getElementById("checkOut_btn");
    		Orderbtn.style.opacity = '0.3';
let lastAddedElement = document.getElementById("foodName");
let parentDiv = document.getElementById("foodName").parentNode;
let item = 0;

function addToOrder (CheckBoxelement) {
	let foodName = document.getElementById("foodName");
	let checkValue = CheckBoxelement.value;
	let detail = checkValue.split(",");	
	
	if (CheckBoxelement.checked == true) {
		//foodName.innerText = "bjkb";
		item++;
		let para = document.createElement("P");
		para.setAttribute('id', detail[0]);
		let paraText = document.createTextNode(detail[0]+", Price: "+detail[1]+ " Quantity: "+detail[2]);
		para.appendChild(paraText);
		parentDiv.insertBefore(para, lastAddedElement);
		parentDiv = document.getElementById(detail[0]).parentNode;
		lastAddedElementID = document.getElementById(detail[0]);
		Orderbtn.style.opacity = '1';
	}
	else  {
		item--;
		foodName.innerText = "";
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