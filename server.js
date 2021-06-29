const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const getProfile = require("./controllers/getProfile");
const image = require("./controllers/image");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});



//the below statement returns a promise hence we retreive it by using .then()
// db.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();
app.use(express.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: 1,
//             name: "john",
//             email: "john@gmail.com",
//             password: "cookies",
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: 2,
//             name: "ben",
//             email: "jben@gmail.com",
//             password: "biscuits",
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

app.get("/", (req, res) => {
    res.json("It is working!!");
})

app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get("/profile/:id", (req, res) => { getProfile.handleProfile(req, res, db) })

app.put("/image", (req, res) => { image.handleImage(req, res, db) })

app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on ${process.env.PORT}`);
}) 





/*
/ ---> res = this is working
/signin ---> POST = success/fail
/register ---> POST = user
/profile/:userId ---> GET user
/image ---> PUT =user
*/