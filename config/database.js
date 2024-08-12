var sql = require("mssql");

var config = {
    user: "sa",
    password: "Jangandibuka02",
    server: "localhost",
    database: "alfarshopdb",
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

function ExecuteSQL(query) {
    return new Promise((resolve, reject) => {
        sql.connect(config, (err, db) => {
            if (err) reject(err);
            var request = new sql.Request();
            request.query(query, (err, db) => {
                if (err) reject(err);
                resolve(db);
            });
        });
    });
}

module.exports = {
    ExecuteSQL: ExecuteSQL,
};