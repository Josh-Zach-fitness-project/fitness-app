require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const client = require("./db/client")
const apiRouter = require("./api")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const { getUserById } = require("./db")
client.connect();

// Setup your Middleware and API Router here
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

apiRouter.use(async (req,res,next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)){
        const token = auth.slice(prefix.length);
        
            const {id} = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await getUserById(id)
                // console.log('KKKKKKKK', req)
                next();
            }

    }else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        })
    }

});


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
