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



//Insert an Contactss
// app.post('/Contacts', (req, res) => {
//     let emp = req.body;
//     var sql = "SET first_name = ?;SET last_name = ?;SET email = ?;SET mobile = ?; \
//     CALL ContactsAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
//     mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
//         if (!err)
//             rows.forEach(element => {
//                 if(element.constructor == Array)
//                 res.send('Inserted Contacts id : '+element[0].EmpID);
//             });
//         else
//             console.log(err);
//     })
// });



//Get all Contactss
app.get('/Contactss', (req, res) => {
    mysqlConnection.query('SELECT * FROM Contacts', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })  
});

//Get an Contactss
app.get('/Contacts/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Contacts WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an Contactss
app.delete('/Contacts/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Contacts WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});



//Update an Contactss
app.put('/Contacts', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL ContactsAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


//order post api 

app.post('/Contacts', (req, res) => {

    let data = req.body
    let { first_name, last_name, email, mobile } = data


    mysqlConnection.query("INSERT INTO Contacts SET = ?", { first_name: first_name, last_name:last_name , email: email, mobile :mobile }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            return res.send(results);
        }
    })
})



