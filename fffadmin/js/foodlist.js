let tblHistory = document.getElementById('inbox');

fetch('https://dokenedgar.herokuapp.com/api/v2/admin/foodlists')
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
      serialNum.innerHTML = index + 1;
      food.innerHTML = elementf.foodName;
      desc.innerHTML = elementf.foodDesc;
      price.innerHTML = elementf.foodPrice;
    });
  })
  .catch((err) => console.log(err))