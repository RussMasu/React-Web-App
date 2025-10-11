import { useState, useEffect, Fragment } from 'react';
import { Grid, AppBar, Button, Stack, Box, Container} from '@mui/material';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router";
import Home from "./pages";
import Weather from "./pages/weather";

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
    <Router>
      <Stack justifyContent="center" direction="row" spacing={20}>
        <a href="/">Home</a>
        <a href="/weather">Weather</a>
      </Stack>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>  
  );
}

export default App
