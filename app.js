require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const client = require("./db/client")
const apiRouter = require("./api")
client.connect();

// Setup your Middleware and API Router here
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// app.use((req, res, next) => {
//     console.log("<____Body Logger START____>");
//     console.log(req.body);
//     console.log("<_____Body Logger END_____>");
    
//     next();
// });

app.use("/api", apiRouter);

app.use((error, req, res, next) => {
    res.send(
        error
    );
});

module.exports = app;
