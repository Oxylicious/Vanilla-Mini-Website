"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("sqlite3");
var express = require("express");
var cors = require("cors");
var db = new sql.Database("./ServerData.db", function (err) {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Database Success");
    }
});
// Initiator
var api = express();
var PORT = 3000;
api.use(express.json());
api.use(cors());
db.serialize(function () {
    db.run("\n        CREATE TABLE IF NOT EXISTS accounts(\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            email TEXT UNIQUE,\n            password TEXT\n        )    \n    ");
});
api.post("/register", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    db.get("SELECT * FROM accounts WHERE email = ?", [email], function (err, rowData) {
        if (err) {
            console.error(err.message);
            return res.json({ status: "REG_FAIL" });
        }
        if (rowData) {
            return res.json({ status: "EMAIL_EXIST" });
        }
        else {
            db.run("INSERT INTO accounts(email, password) VALUES (?, ?)", [email, password], function (err) {
                if (err) {
                    console.error(err.message);
                    return res.json({ status: "REG_FAIL" });
                }
                else {
                    console.log("Inserted!\nEmail: " + email + "\nPassword: " + password);
                    return res.json({ status: "REG_PASS" });
                }
            });
        }
    });
});
api.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    db.get("SELECT * FROM accounts WHERE email = ?", [email], function (err, rowData) {
        if (err) {
            console.error("Error: " + err.message);
            return res.json({ status: "LOGIN_SERVER_FAIL" });
        }
        else {
            if (!rowData) {
                return res.json({ status: "EMAIL_NOT_EXIST" });
            }
            else if (rowData["email"] === email) {
                if (rowData["password"] !== password) {
                    return res.json({ status: "LOGIN_FAIL" });
                }
                else {
                    return res.json({ status: "LOGIN_PASS" });
                }
            }
        }
    });
});
api.listen(PORT, function () {
    console.log("Connected to: http://localhost:" + PORT);
});
