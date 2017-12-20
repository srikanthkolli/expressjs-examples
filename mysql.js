/* mysql dependency */
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');


/* create connection */
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: 'expressjs'
});

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

/** connection string */
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully!");
});

app.get('/', function(req, res){
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

/* list data */
app.get('/employee-list', function(req, res){
    conn.query("SELECT * FROM employees", function(err, results){
        let records;
        let rows;
        if (results) {          
            records = results;
            rows = results.length;
        } else {
            req.flash('info', 'No records found');
            records = "No records found";
            rows = 0;
        }
        res.render('list', { title: 'List', message: 'Employee list', results:records, rows:rows });
    })
});

/* delete data */
app.get('/employee-list/:id', function(req, res){
    conn.query("DELETE FROM employees WHERE emp_id = ?",[req.params.id], function(err, results){
        if(results.affectedRows) {
            req.flash('info', 'Deleted successfully');
            res.redirect('/employee-list');
        } else {
            req.flash('info', 'Error in Delete');
        }
    });
});

/* add/update form */
app.get('/manage-employee', function(req, res){
    res.render('manage', { title: 'Add', message: 'Employee Add' });    
});

/* add/update handle post*/
app.post('/manage-employee', function(req, res){

    let form_request = req.body;

    let columnsArr = Object.keys(form_request);
    let valueArr = Object.values(form_request);

    if (columnsArr.indexOf("emp_id") != -1) {

        let query = "UPDATE employees set first_name = ?, last_name=?, phone=?, email=? WHERE emp_id = ?";

        conn.query(query,[form_request.first_name, form_request.last_name, form_request.phone, form_request.email, form_request.emp_id], function(err, results){
            if (results.affectedRows) {
                req.flash('info', 'Updated successfully');
            } else {
                req.flash('info', 'Error in update');
            }
            
            res.redirect('/employee-list');
        })

    } else {
        let columns = columnsArr.join();
        let query = "INSERT INTO employees("+columns+") values ?";
        let values = [valueArr];
        conn.query(query,[values], function(err, results){
            if (results.affectedRows) {
                req.flash('info', 'Inserted successfully');
            } else {
                req.flash('info', 'Error in insert');
            }

            res.redirect('/employee-list');
        })
    }
});

app.get('/manage-employee/:id', function(req, res){
    conn.query("SELECT * FROM employees WHERE emp_id = ?",[req.params.id], function(err, rows, fields){
        res.render('edit', { title: 'Edit User', message: 'Employee Edit', empData: rows[0] });
    });
});

app.listen(3030, function(){
    console.log('Example app listening on port 3030!')
});

