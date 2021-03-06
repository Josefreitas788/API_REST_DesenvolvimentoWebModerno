const express = require('express');
const bodyParser = require('body-parser');
const testeController = require('./controllers/TestControllers');

//Mongodb config
const mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect('mongodb+srv://Josefilo:Ibacpf17blYgQRnN@cluster0.kvg8p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const userController = 
  require('./controllers/UserController');
  app.post('/user',userController.store);
  app.get('/user',userController.show);
  app.get('/user/buscaemail/*',userController.index);



app.get('/', (req, res) => {
	res.send('Alô REST API');
});

app.get('/usercontroller', testeController.show);


app.get('/api/echo/:param*', (req, res) => {
	res.send(req.params.param);
});

app.get('/api/echodbl/:param1/:param2', (req, res) => {
	res.send(req.params.param1 + ', ' + req.params.param2);
});

app.get('/api/echoquery/*', (req, res) => {
	res.send(req.query.q);
});

app.get('/api', (req, res) => {
	res.send('API ativa !!!');  
});

const users = [
  {name: 'Jones', email: 'jones@gmail.com'},
  {name: 'Henrique', email: 'henrique@hotmail.com'}
]

app.get('/users', (req, res) => {
	res.json(users);
});

app.post('/api/echobody', (req,res) => {
  res.send(req.body);
  
});


// exclui user
//req.params  = route params (post, put, delete)
app.delete('/user/:id', userController.destroy);



app.listen(3000, () => console.log('server started'));


// https://reqbin.com/