const sql = require("sqlite3");
const db = new sql.Database("./ServerData.db");
db.serialize(() => {
    db.run("DELETE FROM accounts");
});
db.close();