import { useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
//TODO add display total spent, prices

const Weather = () => {
    const [formData, setFormData] = useState('');
    const [products,setProducts] = useState([]);
    const [currentOrder,setCurrentOrder] = useState('');

    useEffect(()=>{ //run only once when component mounts
        fetch("http://localhost:8081/product")
        .then(response => response.json())
        .then(data => setProducts(data["rows"]))
        .catch((error) => console.error("database unavalible",error))
    },[])

    function getCurrentOrder(){
        fetch("http://localhost:8081/currentorder")
        .then(response => response.json())
        .then(data => setCurrentOrder(data["rows"][0]["max"] + 1))
        .catch((error) => console.error("error updating current order",error))
    }

    useEffect(()=>{//run only once when component mounts
        getCurrentOrder();
    },[])

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    function handleSubmit(e){ //on submit send form input to backend
        console.log("submit");
        e.preventDefault();
        fetch('http://localhost:8081/form',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData)
        })
        .then((response) => response.json())
        .catch((error) => {console.error("error submitting form data",error)})
        //reset form
        document.getElementById("orderForm").reset();
    };

    return (
        <div className='center'>
        <h3>Order Form Application</h3>
        <p>Retrieve current transaction number and input customer order data into DB</p>
        <br></br>
        <Stack justifyContent="center" direction="row" spacing={20} bgcolor="#cccccc">
            <Box className='input component' sx={{bgcolor:"#ffffff"}}>
                <label for="currentOrder">Transaction Number: {currentOrder}</label>
                <form id="orderForm" onSubmit={handleSubmit}>
                    {products.map((product)=>(
                    <div>
                        <Stack justifyContent="left" direction="row">
                            <label for ={product.product_id}>{product.product_name}: </label>
                            <input type="number" name={product.product_id} size="5" onChange={handleChange}/>
                        </Stack>
                     </div>
                    ))}
                    <label for="comments">Comments: </label>
                    <input type="text" name="comments" size="40" onChange={handleChange}/>
                    <br></br>
                    <input type="submit" name="submit" value="Submit" onClick={getCurrentOrder}/>
                </form>
            </Box>
            <Box className='input component' sx={{bgcolor:"#ffffff"}}>
                <h1>stuff here  </h1>
            </Box>
        </Stack>
        </div>
    );
};

export default Weather;