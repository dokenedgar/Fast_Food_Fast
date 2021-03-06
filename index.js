let express = require('express');
let app = express();
let path = require('path');

// Get the port:
const PORT = process.env.PORT || 3033;
// Listen on the port:

app.use(express.static(path.join(__dirname, '/UI/css')));
app.use(express.static(path.join(__dirname, '/UI/images/')));
app.use(express.static(path.join(__dirname, '/UI/js/')));
app.use(express.static(path.join(__dirname, '/fffadmin/js/')));
app.use(express.json());

let users = [
  { fname: 'Yakubu', sname: 'Frank', phone: '12345678900', username: 'Franky', pword: 'superfrank' },
  { fname: 'David', sname: 'McKenxie', phone: '09876543211', username: 'McDave', pword: 'pword' }
];
let adminUsers = [
  { username: 'lionel', password: 'messi' },
  { username: 'sergio', password: 'ramos' }
];

let orders = [];
let foodList = [
  { foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' },
  { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' },
  { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' },
  { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' },
  { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' },
  { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' },
  { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' },
  { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' },
  { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' },
  { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }
];
let messagesToAdmin = [];
let messagesFromAdmin = [
  { receiver: 'McDave', message: 'Order received' },
  { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' },
  { receiver: 'Franky', message: 'Order accepted' },
  { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }
];

app.get('/', (req, res) => {
  // res.sendFile(path.join('dokenedgar.herokuapp.com/'+'/UI/index.html'));
  res.sendFile(path.join(__dirname, '/UI/index.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/index.html'));
});

app.get('/index/foodList', (req, res) => {
  res.send(foodList);
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/signup.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/signup.html'));
});

app.post('/signup', (req, res) => {
  const newUser = {
    fname: req.body.fname, sname: req.body.sname, phone: req.body.phone, username: req.body.username, pword: req.body.pword
  };
  users.push(newUser);
  res.send(newUser);
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/signin.html'));
});
app.get('/signin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/signin.html'));
});

app.get('/signin/:uname/:pword', (req, res) => {
  let result = { userFound: false };
  const signInUser = {
    username: req.params.uname, password: req.params.pword
  };
  users.forEach(function (element) {
    if ((element.username === signInUser.username) && (element.pword === signInUser.password)) {
      result.userFound = true;
    }
  });
  res.send(result);
});

// Loggen in user nav
app.get('/api/v1/:user/dashboard', (req, res) => {
  // if (req.params) {}
  res.sendFile(path.join(__dirname, '/UI/dashboard.html'));
});
app.get('/api/v1/:user/orders', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/history.html'));
});
app.get('/api/v1/:user/messages', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/messages.html'));
});

app.post('/api/v1/:user/messages', (req, res) => {
  const newMsg = {
    sender: req.body.sender, message: req.body.message
  };
  messagesToAdmin.push(newMsg);
  res.send(messagesToAdmin);
});

app.get('/api/v1/messages/:user', (req, res) => {
  let msgs = [];
  messagesFromAdmin.forEach(function (element, index) {
    if (element.receiver === req.params.user) {
      msgs = msgs.concat(element);
    }
  });
  res.send(msgs);
});

// GET A USERS ORDERS
app.get('/api/v1/orders/:user', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.user === req.params.user) {
      order = order.concat(element);
    }
  });
  res.send(order);
});
// GET SPECIFIC USER ORDER USING ORDER ID
app.get('/api/v1/:user/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/order.html'));
});

app.get('/api/v1/orders/:user/:id', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.id) {
      order = order.concat(element);
    }
  });
  res.send(order);
});

// PLACE AN ORDER
app.post('/api/v1/:user/placeOrder', (req, res) => {
  console.log(req.body);
  let orderId = Math.floor(Math.random() * 12345);
  const newOrder = {
    orderID: orderId + req.params.user, user: req.params.user, order: req.body, status: 'pending'
  };
  orders.push(newOrder);
  res.send(orders);
});

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, '/UI/signin.html'));
});

// get users
app.get('/users', (req, res) => {
  res.status(200).send(users);
});

// ADMIN HOMEPAGE
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/index.html'));
});
app.post('/api/v2/admin', (req, res) => {
  let result = { userFound: false };
  const signInUser = {
    username: req.body.uname, password: req.body.pword
  };
  adminUsers.forEach(function (element) {
    if ((element.username === signInUser.username) && (element.password === signInUser.password)) {
      result.userFound = true;
    }
  });
  res.send(result);
});

app.get('/api/v2/admin/admindashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/admindashboard.html'));
});

app.get('/api/v2/admin/foodlist', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/foodlist.html'));
});

app.get('/api/v2/admin/foodlists', (req, res) => {
  res.send(foodList);
});

app.get('/api/v2/admin/addfood', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/addfood.html'));
});

app.get('/api/v2/admin/editfood', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/editfood.html'));
});
app.put('/api/v2/admin/editfood', (req, res) => {
  let order = [];
  foodList.forEach(function (element, index) {
    if (element.foodName === req.body.foodName) {
      element.foodPrice = req.body.foodPrice;
      element.foodDesc = req.body.foodDesc;
      order = order.concat(element);
    }
  });
  res.send(order);
});

app.get('/api/v2/admin/deletefood', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/deletefood.html'));
});
app.delete('/api/v2/admin/deletefood', (req, res) => {
  foodList.forEach(function (element, index) {
    if (element.foodName === req.body.foodName) {
      foodList.splice(index, 1);
    }
  });
  res.send(foodList);
});

app.post('/api/v2/admin/addfood', (req, res) => {
  const newFood = {
    foodName: req.body.foodName, foodPrice: req.body.foodPrice, foodDesc: req.body.foodDesc
  };
  foodList.push(newFood);
  res.send(foodList);
});

app.get('/api/v2/admin/messages', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/adminmessages.html'));
});

app.get('/api/v2/messages/admin', (req, res) => {
  res.send(messagesToAdmin);
});

app.post('/api/v2/admin/messages', (req, res) => {
  const newMsg = {
    receiver: req.body.receiver, message: req.body.message
  };
  messagesFromAdmin.push(newMsg);
  res.send(messagesFromAdmin);
});

app.get('/api/v2/admin/orders', (req, res) => {
  res.send(orders);
});

app.put('/api/v2/admin/orders/:id', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.id) {
      element.status = req.body.status;
      order = order.concat(element);
    }
  });
  res.send(order);
});

// GET A USERS ORDERS
app.get('/api/v2/admin/userorders/:order', (req, res) => {
  res.sendFile(path.join(__dirname, '/fffadmin/userorders.html'));
});

app.get('/api/v2/admin/orders/:order', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.order) {
      order = order.concat(element);
    }
  });
  res.send(order);
});

app.get('/api/v2/admin/food/:name', (req, res) => {
  let order = [];
  foodList.forEach(function (element, index) {
    if (element.foodName === req.params.name) {
      order = order.concat(element);
    }
  });
  res.send(order);
});
// let server = app.listen(80);
app.listen(PORT, 'localhost');//() => console.log('Listening on', PORT));

// module.exports = server
module.exports = app;