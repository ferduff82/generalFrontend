var mysql = require('mysql');

var con = mysql.createConnection({
    host: "ferduff8.heliohost.org",
    user: "ferduff8_fer",
    password: "warrant2315",
    database: "ferduff8_dataTest"
});

con.connect(function(err) {
    if(err){
        console.log(err);
    } else {
        console.log('Database connection successful');

        var comp = 'buda';
        var dire = 'alsina';

        var sql = "INSERT INTO customers (name, address) VALUES ('" + comp + "', '" + dire + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
});
