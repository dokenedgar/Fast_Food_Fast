let tblHistory = document.getElementById('food-menu');

fetch('https://dokenedgar.herokuapp.com/index/foodlist')
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    console.log(orders);
    orders.forEach(function (elementf, index) {
      let row = tblHistory.insertRow(index + 1);
      let serialNum = row.insertCell(0);
      let food = row.insertCell(1);
      let desc = row.insertCell(2);
      let price = row.insertCell(3);
      let checkboxAddToOrder = row.insertCell(4);
      serialNum.innerHTML = index + 1;
      food.innerHTML = elementf.foodName;
      desc.innerHTML = elementf.foodDesc;
      price.innerHTML = elementf.foodPrice;
      checkboxAddToOrder.innerHTML = '<input type="checkbox" name="myCheck" id="myCheck" onchange="addToOrder(this)" value="' + elementf.foodName + ',' + elementf.foodPrice + ',' + 1 + '" >'
    });
  })
  .catch((err) => console.log(err))