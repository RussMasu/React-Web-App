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
app.use(express.static('dist'));  //serve static files in dist dir
// Create a connection to the PostgreSQL database
const db = new pg.Pool  ({
    host: keys.host,
    user: keys.user,
    password: keys.password,
    database: keys.database,
    port: keys.port
});

// Define a route for the root URL '/'
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("From backend side");
});

// Define a route to fetch all items from the product table
app.get('/product', async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM product");
        res.json(result.rows);
    } catch(err){
        console.error(err);
    }
});

// Define a route to fetch current order number table
app.get('/currentorder', async (req, res) => {
    try{
        const result = await db.query("SELECT MAX(max_order) OVER(),month_sum,SUM(month_sum) OVER() AS total_sum,mm, yyyy FROM (SELECT MAX(order_id) AS max_order,SUM(order_amount) AS month_sum,DATE_PART('month',order_date) AS mm, DATE_PART('year',order_date) AS yyyy from orders GROUP BY DATE_PART('month',order_date),DATE_PART('year',order_date)) AS q1");
        res.json(result.rows);
    } catch(err){
        console.error(err);
    }
});

app.post('/form',async (req,res) =>{
    const data = req.body;
    const qcurrentOrderID = await db.query("select MAX(order_id) from orders");
    const currentOrderID = qcurrentOrderID["rows"][0]["max"]+1;
    const qproducts = await db.query("select * from product");
    const products = qproducts["rows"];
    const currDate = new Date().toLocaleString();
    let santiziedComments = data.comments;
    if(data.comments){
        santiziedComments = encodeURIComponent(data.comments.replaceAll("'",""));
    }
    let total = 0;
    const sql = "INSERT INTO orders (order_date,comments) VALUES('"+currDate+"','"+santiziedComments+"')";
    const insertQuery = await db.query(sql);
    const keys = Object.keys(data);
    for(let i=0;i<keys.length;i++){
        if(keys[i]!= "comments"){
            let quantity = data[keys[i]];
            //todo here issue latest key not being detected
            const sql2 = "INSERT INTO order_detail (order_id,product_id,quantity) VALUES('"+currentOrderID+"','"+keys[i]+"','"+quantity+"')";
            if(quantity != ""){
                total = total + parseInt(quantity) * products[i]["product_price"];
                const insertQuery2 = await db.query(sql2);
            }
        }
        const sql3 = "UPDATE orders SET order_amount = '"+total+"' WHERE order_id = '"+currentOrderID+"'";
        const updateQuery = await db.query(sql3);
    }
    db.query("SELECT MAX(max_order) OVER(),month_sum,SUM(month_sum) OVER() AS total_sum,mm, yyyy FROM (SELECT MAX(order_id) AS max_order,SUM(order_amount) AS month_sum,DATE_PART('month',order_date) AS mm, DATE_PART('year',order_date) AS yyyy from orders GROUP BY DATE_PART('month',order_date),DATE_PART('year',order_date)) AS q1",
        (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// Start the server and listen on port 8080
app.listen(8080, () => {
    console.log("listening");
});