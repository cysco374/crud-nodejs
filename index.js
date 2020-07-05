// path module
const path = require('path');
// express module
const express = require('express');
// hbs view engine
const hbs = require('hbs');
// body-parser middleware
const bodyParser = require('body-parser');
// mysql db
const mysql = require('mysql');
const app = express();

//config db
const conn = mysql.createConnection(
{
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'crud_db'
});

// connection db
conn.connect(
	(err) => {
		if (err) throw err;
		console.log('MySql Connected OK');
	});

//set view
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set folder public