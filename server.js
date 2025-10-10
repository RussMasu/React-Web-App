// server.js
// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const pg = require('pg'); // pg client for Node.js
const cors = require('cors'); // For web security
const bodyParser = require('body-parser');
const keys = require('./keys.json');

// Create an instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the PostgreSQL database
const db = new pg.Pool({
    host: keys.host,
    user: keys.user,
    password: keys.password,
    database: keys.database,
    port: 5432
});

// Define a route for the root URL '/'
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("From backend side");
});

// Define a route to fetch all items from the product table
app.get('/product', (req, res) => {
    const sql = "select * from product";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

// Define a route to fetch current order number table
app.get('/currentorder', (req, res) => {
    const sql = "select MAX(order_id) from orders";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

// TODO handle data
app.post('/form',(req,res) =>{
    const data = req.body;
})

// Start the server and listen on port 8081
app.listen(8081, () => {
    console.log("listening");
});