import sql = require("sqlite3");
import express = require("express");
import cors = require("cors");

const db = new sql.Database("./ServerData.db", (err) => {
    if (err) {
        console.error((err as Error).message);
    } else {
        console.log("Database Success");
    }
});

// Initiator
const api = express();
const PORT:number = 3000;
api.use(express.json());
api.use(cors());

// Types
type RequestBody = {
    email: string;
    password: string;
}

type ResponseBody = {
    status: string;
}

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS accounts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )    
    `);
});

api.post("/register", (req: express.Request<{}, {}, RequestBody>, res: express.Response<ResponseBody>) => {
    const {email, password} = req.body;
    db.get("SELECT * FROM accounts WHERE email = ?", [email], (err, rowData:any) => {
        if (err) {
            console.error(err.message);
            return res.json({status: "REG_FAIL"});
        }

        if (rowData) {
            return res.json({status: "EMAIL_EXIST"});
        } else {
            db.run("INSERT INTO accounts(email, password) VALUES (?, ?)", [email, password], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.json({status: "REG_FAIL"});
                } else {
                    console.log("Inserted!\nEmail: " + email + "\nPassword: " + password);
                    return res.json({status: "REG_PASS"});
                }
            });
        }
    });
});

api.post("/login", (req: express.Request<{}, {}, RequestBody>, res: express.Response<ResponseBody>) => {
    const {email, password} = req.body;
    db.get("SELECT * FROM accounts WHERE email = ?", [email], (err, rowData:any) => {
        if (err) {
            console.error("Error: " + (err as Error).message);
            return res.json({status: "LOGIN_SERVER_FAIL"});
        } else {
            if (!rowData) {
                return res.json({status: "EMAIL_NOT_EXIST"})
            } else if (rowData["email"] === email) {
                if (rowData["password"] !== password) {
                    return res.json({status: "LOGIN_FAIL"});
                } else {
                    return res.json({status: "LOGIN_PASS"});
                }
            }
        }
    });
});


api.listen(PORT, () => {
    console.log("Connected to: http://localhost:" + PORT);
});
