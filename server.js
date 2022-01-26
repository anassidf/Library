const express = require('express');
const expressLayout = require('express-ejs-layouts');
const routers = require('./controller/routes');
const mongoose = require('mongoose');
const app = express();

/* mongodb connection  */

mongoose.connect(
	'mongodb+srv://anas:12345@cluster0.tbnv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', (error) => {
	console.error(error);
});

db.once('open', () => {
	console.log('mongoDB connection succeeded');
});

/* here we will use view engin (ejs) */

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.set(express.static('public'));

/* middlewares */

app.use(express.json());
app.use(expressLayout);

/* routes */
app.use('/', routers);

app.listen(3001, () => {
	console.log('Server is running on port 3001');
});
