// server.js
// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const pg = require('pg'); // pg client for Node.js
const cors = require('cors'); // For web security
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the PostgreSQL database
const db = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "pass",
    database: "postgres",
    port: 5432
});

// Define a route for the root URL '/'
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("From backend side");
});

// Define a route to fetch all items from the 'product' table
app.get('/product', (req, res) => {
    const sql = "select * from product";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

// get form data TODO santize inputs, look up sending data from react to express
app.post('/form',(req,res) =>{
    const data = req.body;
    console.log(data);
})

// Start the server and listen on port 8081
app.listen(8081, () => {
    console.log("listening");
});