import { useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  
  //send data
  function handleSubmit(e){
    //handle data
    e.preventDefault();
    //setInputValue(e.target.value);
    fetch('http://localhost:8081/form',{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(inputValue)
    })
    .then((response) => response.json())
    .catch((error) => {console.error("error submitting form data",error)})
  }
  //fetch data - change so only called on page load instead of app update
  fetch("http://localhost:8081/product")//called every app is updated such as type into form
    .then(response => response.json())
    .then(data => console.log(data))

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for ="fname">first name </label>
        <input type="text" name="fname" onChange={handleChange}/>
        <label for ="fname">first name </label>
        <input type="text" name="lname" onChange={handleChange}/>
        <input type="submit"/>
      </form>
    </>
  )
}

export default App
