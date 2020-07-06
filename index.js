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
app.use('/assets',express.static(__dirname + '/public'));

//route
app.get('/',(req, res) => {
	let sql = "SELECT * FROM product";
	let query = conn.query(sql, (err, results) => {
		if(err) throw err;
		res.render('product_view',{
			results:results
		});
	});
});

//route add data
app.post('/save',(req, res) => {
	let data = {
		product_name: req.body.product_name,
		product_price: req.body.product_price
	};
	let sql = "INSERT INTO product SET ?";
	let query = conn.query(sql, data,(err, results) => {
		if(err) throw err;
		res.redirect('/');
	});
});

//route update data
app.post('/update',(req, res) => {
	let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.body.id;
	let query = conn.query(sql, (err, results) => {
		if(err) throw err;
		res.redirect('/');
	});
});

//route delete data
app.post('/delete',(req, res) => {
	let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.redirect('/');
	});
});

//server listen
app.listen(8000, () => {
	console.log('Server is running at port 8000');
})