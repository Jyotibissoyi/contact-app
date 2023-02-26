const mysql = require('mysql2');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());



var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Jyoti25@',
    database: 'Contacts',
    multipleStatements: true
});



mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});



app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));




//------------------------------------------<  API  >----------------------------------------------- 


//create contact
app.post('/Contacts', (req, res) => {
    let emp = req.body;
    var sql = "CALL ContactsAddOrEdit(?, ?, ?, ?, ?);";
    mysqlConnection.query(sql, [emp.contacts_id, emp.first_name, emp.last_name, emp.email, emp.mobile_No], (err, rows, fields) => {
        if (!err) {
            rows.forEach(row => {
                if (row.constructor == Array) {
                    res.send('Inserted Contacts id: ' + row[0].contacts_id);
                }
            });
        } else {
            console.log(err);
            res.status(500).send({ msg: err.message });
        }
    });
});

//Get an Contactss
app.get('/Contacts/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Contacts WHERE contacts_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})
 
//Delete an Contacts
app.delete('/Contacts/:id', (req, res) => {
mysqlConnection.query('DELETE FROM Contacts WHERE contacts_id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
        res.send("delete successfully");
    else
        console.log(err);
})
})




//Update an Contacts
app.put('/Contacts', (req, res) => {
    let emp = req.body;
    var sql = "CALL ContactsAddOrEdit(?, ?, ?, ?, ?);";
    mysqlConnection.query(sql, [emp.contacts_id, emp.first_name, emp.last_name, emp.email, emp.mobile_No], (err, rows, fields) => {
        if (!err) {
            res.send('Updated successfully');}
        else
            console.log(err);
    })
});





