import React from "react";
import { Divider, Stack, Box } from '@mui/material';
import picTemple from '../assets/temple.jpg';
import picHorse from '../assets/snowhorse.jpeg';
import picAquarium from '../assets/aquarium-tunnel.jpg';
//fix layout to display correctly on desktop and mobile

const Home = () => {
    return (
        <div>
            <h2>Let's plan your next trip to Hokkaido, Japan!</h2>
            <p style={{fontSize:"18px"}}>From the Sapporo Snow Festival to the Otaru Aquarium there a plenty of places to visit.  Learn about more about which popular tourist destinations to visit and places to eat at in this offical guide. </p>
            <Divider style={{marginLeft:"105px",marginRight:"105px"}}></Divider>
            <Stack direction="row" spacing={5}>
                <Box style={{  marginLeft:"200px",width:"800px"}}>
                    <div className="sticky">
                        <h3>On This Page</h3>
                        <ul>
                        <li><a href="#snowfestival">Sapporo Snow Festival</a></li>
                        <li><a href="#odoripark">Odori Park</a></li>
                        <li><a href="#susukino">Susukino District</a></li>
                        <li><a href="#otaruaquarium">Otaru Aquarium</a></li>
                        </ul>
                    </div>
                </Box>
                <Box style={{marginRight:"105px"}}>
                    <figure>
                    <img src={picTemple} alt='Snow Festival' width="800" height="500"/>
                    <figcaption>A snow sculpture at Sapporo Snow Festival.</figcaption>
                    </figure>
                    <h2 id="snowfestival">Sapporo Snow Festival</h2>
                    <p> The Sapporo Snow Festival first began in 1950 when local middle school and high school students 
                        built snow sculptures in Odori Park.  Since then it has balloned into an event attend by over two million
                        visitors and is spread over three main sites within the city of Sapporo which include Odori Park, the Susukino district, and the Tsu Dome. </p>
                    
                    <Stack direction="row" spacing={0}>
                        <Box style={{marginRight:"15px"}}>
                            <h2 id="odoripark">Odori Park</h2>
                            <p> In the heart of Sapporo lies Odori Park which spans 1.5 km.
                            From Odori Park you can easy see Sapporo's iconic Sapporo TV tower.  Every winter there are hundreds of snow sculptures
                            displayed here during the Sapporo Snow Festival, with the largest sculptures easily towering over 20 feet.
                            </p>
                            <h2 id="susukino">Susukino District</h2>
                            <p>The second location for the Sapporo Snow Festival takes place in the Susukino district
                                which is an entertainment district known for it's bars, restaurants, karaoke shops, 
                                pachiko parlors.  While here instead of snow sculptures, you'll find several ice sculptures sponsered
                                by local businesses.</p>   
                        </Box>
                        <Box style={{marginRight:"65px"}}>
                            <img src={picHorse} alt='Snow Sculpture' width="200" height="300"/>
                        </Box>
                        </Stack>
                    <Box style={{marginLeft:"35px"}}>
                        <img src={picAquarium} alt='Aquarium Tunnel' width="800" height="500"/>    
                    </Box>
                    <h2 id="otaruaquarium">Otaru Aquarium</h2>
                    <p>Coming Soon!</p>
                </Box>
            </Stack>
        </div>
    );
};

export default Home;