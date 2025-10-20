import { useState, useEffect } from 'react';
import { Stack, Box, Divider } from '@mui/material';

//TODO add monthly income
const Weather = () => {
    const [formData, setFormData] = useState('');
    const [products,setProducts] = useState([]);
    const [currentOrder,setCurrentOrder] = useState('');
    const [totalIncome,setTotalIncome] = useState('');

    useEffect(()=>{ //run only once when component mounts
        fetch("http://localhost:8081/product")
        .then(response => response.json())
        .then(data => setProducts(data["rows"]))
        .catch((error) => console.error("database unavalible",error))
    },[])

    function getCurrentOrder(){
        fetch("http://localhost:8081/currentorder")
        .then(response => response.json())
        .then(data => {
            let nextOrder = data["rows"][0]["max"] + 1;
            setCurrentOrder(nextOrder);
            setTotalIncome(data["rows"][0]["sum"]);
        })
        .catch((error) => console.error("error updating current order",error))
        
    }

    useEffect(()=>{//run only once when component mounts
        getCurrentOrder();
    },[])

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    function handleSubmit(e){ //on submit send form input to backend
        e.preventDefault();
        //validate form
        let isValid = true;
        products.forEach((product) => {
            let formInput = product.product_id + "-input";
            let errorLabel = product.product_id + "-error";
            document.getElementById(errorLabel).innerText = ""
            if(document.getElementById(formInput).value > 100){
                isValid = false;
                document.getElementById(errorLabel).innerText = "Order amount must be 100 or less"
            }
        })
        //submit form
        if(isValid){
            fetch('http://localhost:8081/form',{
                method:"POST",
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(formData)
            })
            .then((response) => {return response.json()})
            .then(data => {
                let nextOrder = data["rows"][0]["max"] + 1;
                setCurrentOrder(nextOrder);
                setTotalIncome(data["rows"][0]["sum"]);
            });
        
            //reset form
            document.getElementById("orderForm").reset();
        }
        };

    return (
        <>
        <Box marginLeft="35px">
        <h3>Order Form Application</h3>
        <p>Retrieve current transaction number and input customer order data into DB</p>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
        <Stack justifyContent="center" direction={{xs:"column",md:"row"}} alignItems="center" spacing={5} bgcolor="#cccccc" height={{xs:"500px",md:"350px"}} width="100%">
            <Box sx={{bgcolor:"#ffffff",width:"350px"}}>
                <div className='center'>
                <label for="currentOrder">Transaction Number: {currentOrder}</label>
                <Box height="25px"></Box>
                <form id="orderForm" onSubmit={handleSubmit}>
                    {products.map((product)=>(
                        <Stack justifyContent="space-even" direction="row" marginLeft="35px">
                            <label for ={product.product_id} className="orderAmount">{product.product_name}: </label>
                            <input type="number" name={product.product_id} id={product.product_id + "-input"} size="5" onChange={handleChange}/>
                            <label id={product.product_id + "-error"} className="error"></label>
                        </Stack>
                    ))}
                    <label className="comments" for="comments">Comments: </label>
                    <input type="text" name="comments" size="30" onChange={handleChange}/>
                    <br></br>
                    <input type="submit" name="submit" value="Submit"/>
                </form>
                </div>
            </Box>
            <Box display="flex" justifyContent="center" sx={{bgcolor:"#ffffff", height:"180px",width:"250px"}}>
                <div>
                    <p>Total Income: ${totalIncome}</p>
                    {products.map((product)=>(
                        <p>{product.product_name}: ${product.product_price}</p>
                    ))}
                </div>
            </Box>
        </Stack>
        </Box>
        </>
    );
};

export default Weather;