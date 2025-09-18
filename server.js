// server.js
// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const pg = require('pg'); // pg client for Node.js
const cors = require('cors'); // For web security

// Create an instance of express
const app = express();
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

// Define a route to fetch all items from the 'items' table
app.get('/items', (req, res) => {
    const sql = "select * from items"; // SQL query to select all items
    db.query(sql, (err, data) => { // Execute the SQL query
        if (err) return res.json(err); // If there's an error, return the error
        return res.json(data); // Otherwise, return the data as JSON
    })
});

// Start the server and listen on port 8080
app.listen(8080, () => {
    console.log("listening");
});