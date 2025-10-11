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

function App() {
  return (
    <Router>
      <Stack justifyContent="space-between" direction="row" spacing={20}>
        <h1>RussMasu</h1>
        <Box alignContent="center"><input value="search bar"></input></Box>
      </Stack>
      <Stack justifyContent="center" direction="row" spacing={20} sx={{bgcolor:"#01579b", height:"70px"}}>
        <Button component={Link} to="/" sx={{color:"#ffffff"}}>Home</Button>
        <Button component={Link} to="/weather"sx={{color:"#ffffff"}}>Weather</Button>
      </Stack>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>  
  );
}

export default App
