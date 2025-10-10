import { useState, useEffect, Fragment } from 'react';
import { Grid, AppBar, Button, Stack, Box, Container} from '@mui/material';
import './App.css';

function App() {
  const [formData, setFormData] = useState('');
  const [products,setProducts] = useState([]);
  const [currentOrder,setCurrentOrder] = useState('');

  useEffect(()=>{
    //run only once when component mounts
    fetch("http://localhost:8081/product")
    .then(response => response.json())
    .then(data => setProducts(data["rows"]))
    .catch((error) => console.error("database unavalible",error))
  },[])

  useEffect(()=>{
    //run only once when component mounts
    fetch("http://localhost:8081/currentorder")
    .then(response => response.json())
    .then(data => setCurrentOrder(data["rows"][0]["max"] + 1))
    .catch((error) => console.error("database2 unavalible",error))
  },[])

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  function handleSubmit(e){
    //on submit send form input to backend
    e.preventDefault();
    fetch('http://localhost:8081/form',{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then((response) => response.json())
    .catch((error) => {console.error("error submitting form data",error)})
  };

  return (
    <>
      <Box>
        <Stack justifyContent="space-between" direction="row">
          <Box>
            <h1>RussMasu</h1>
          </Box>
          <Box>
            <input type="text" value="search bar"></input>
          </Box>
        </Stack>
      </Box>
      <Box sx={{bgcolor:"#01579b"}}>
        <Stack justifyContent="center" direction="row" spacing={20}>
          <Button variant="text" sx={{color:"#ffffff"}}>Text</Button>
          <Button variant="text" sx={{color:"#ffffff"}}>Text2</Button>
        </Stack>
      </Box>
      <h3>Transaction Entry</h3>
      <label for="currentOrder">Transaction Number: {currentOrder}</label>
      <form onSubmit={handleSubmit}>
        {products.map((product)=>(
          <div>
            <label for ={product.product_id}>{product.product_name}: </label>
            <br></br>
            <input type="number" name={product.product_id} size="5" onChange={handleChange}/>
          </div>
        ))}
        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default App
