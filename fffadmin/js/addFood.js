function addFood () {
  let f_name = document.getElementById('foodName').value;
  let f_price = document.getElementById('foodPrice').value;
  let f_desc = document.getElementById('desc').value;
  let signInerrors = document.getElementById('errors');
  if (f_name.length < 2 || f_price < 2 || f_desc < 5) {
    signInerrors.innerHTML = 'Name and price have to be atleast 2 characters, while description at least 5 characters!';
  }
  else {
    fetch('https://dokenedgar.herokuapp.com/api/v2/admin/addfood', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ foodName: f_name, foodPrice: f_price, foodDesc: f_desc })
    })
      .then((resp) => {
      	signInerrors.style.color = 'green';
        signInerrors.innerHTML = 'Food added successfully';
      })
      .catch((error) => console.log(error))
  }
}