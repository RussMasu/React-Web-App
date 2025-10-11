import React from "react";
import { Divider, Stack, Box } from '@mui/material';
import picTemple from '../assets/temple.png';


const Home = () => {
    return (
        <div>
            <h2>Let's plan your next trip to Hokkaido, Japan!</h2>
            <p style={{fontSize:"18px"}}>From the Sapporo Snow Festival to the Otaru Aquarium there a plenty of places to visit.  Learn about more about which popular tourist destinations to visit and which places to eat at in this offical guide. </p>
            <Divider style={{marginLeft:"105px",marginRight:"105px"}}></Divider>
            <Stack justifyContent="" direction="row" spacing={20}>
                <Box>
                    <h1>quicklinks</h1>
                </Box>
                <Box>
                    <figure>
                    <img src={picTemple} alt='Chureito Pagoda' width="800" height="500"/>
                    <figcaption>Chureito Pagoda with Mount Fuji.</figcaption>
                    </figure>
                    <h3>Title</h3>
                    <p>Sample Text</p>
                </Box>
            </Stack>
        </div>
    );
};

export default Home;