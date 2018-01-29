var Connection = require('tedious').Connection;  
var config = {  
    userName: 'bbtintranet',  
    password: 'C00p3r',  
    server: 'bbtdata.cloudapp.net,57500',  
    // If you are on Microsoft Azure, you need this:  
    options: {encrypt: true, database: 'VenomWeb'}  
};  
var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
    });  

    var Request = require('tedious').Request;  
   // var TYPES = require('tedious').TYPES;  

    function executeStatement() {  
        request = new Request("SELECT * from appointments;", function(err) {  
        if (err) {  
            
            console.log(err);}  
        });  
        request.on('debug', function(err) { console.log('debug:', err);});
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  

        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        connection.execSql(request);  
    }  