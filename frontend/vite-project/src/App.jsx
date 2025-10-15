import { useState, useEffect, Fragment } from 'react';
import { Grid, AppBar, Button, Stack, Box, Container} from '@mui/material';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router";
import Home from "./pages";
import Weather from "./pages/weather";
import picLogo from './assets/logo.png';

function App() {
  return (
    <Router>
      <Stack justifyContent="space-between" direction="row" spacing={20}>
        <img src={picLogo} alt='RussMasu logo' width="450" height="150"/>
        <Box alignContent="center"><input value="search bar"></input></Box>
      </Stack>
      <Stack justifyContent="center" direction="row" spacing={20} sx={{bgcolor:"#01579b", height:"70px"}}>
        <Button component={Link} to="/" sx={{fontSize:"18px", color:"#ffffff"}}>Home</Button>
        <Button component={Link} to="/weather"sx={{fontSize:"18px",color:"#ffffff"}}>Weather</Button>
      </Stack>
      <Box alignContent="center">
        <p>This website was created by RussMasu using React</p>
      </Box>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>  
  );
}

export default App
