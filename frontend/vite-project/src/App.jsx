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
  return (
    <Router>
      <Stack justifyContent="center" direction="row" spacing={20}>
        <h1>RussMasu</h1>
        <input value="search bar"></input>
      </Stack>
      <Stack justifyContent="center" direction="row" spacing={20} sx={{bgcolor:"#01579b"}}>
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
