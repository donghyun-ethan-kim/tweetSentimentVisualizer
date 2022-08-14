import React, { useState, useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import {ForceGraph2D} from 'react-force-graph';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import graphData from './Components/graphcopy.json';
import data from './Components/miserables.json'
function App() {
    const [color, setColor] = useState("red")
    const [gdata, setgData] = useState([
      {
            sentiment: 0.7387741208076477,
            id: "@id1"
      },

      {
            sentiment: 0.7387741208076477,
            id: "@id2"
      }
    ])

    const [links, setLinks] = useState([
      {
            source: "@id1",
            target: "@id2"
      }
    ])



    useEffect(() => {

     }, [gdata]);

    useEffect(() => {
        console.log(links);
     }, [links]);


  function getData() {
    axios({
      method: "GET",
      url:"/data",
    })
    .then((response) => {

        for (let i = 0; i < response.data.nodes.length; i++) {

            let nObj = response.data.nodes[i]
            let linkObj = response.data.links[i]
            setgData(array => [...array, nObj]);

            //setLinks(array => [...array, linkObj])
        }
        for (let i = 0; i < response.data.nodes.length; i++) {

            let nObj = response.data.nodes[i]
            let linkObj = response.data.links[i]
            //setgData(array => [...array, nObj]);

            setLinks(array => [...array, linkObj])
        }

        //setgData((array) => array.filter(tempData => tempData.id !== "@id1"));
        //setgData((array) => array.filter(tempData => tempData.id !== "@id2"));
        
    })
  }

  useEffect(() => {
    getData();
  }, []);

    //end of new line

  return (
      // <div> {gdata[gdata.length - 1]["sentiment"]} </div>
      <div>
          <Typography variant="h1" style = {{'margin-left': '30px', 'margin-top' : '20px'}}> Tweet Sentiment Visualizer </Typography>
          <Typography variant="h6" style = {{'margin-left': '40px', 'margin-top' : '20px'}}> Enter a topic to analyze! </Typography>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style = {{'margin-left': '40px', 'margin-top' : '20px'}}/>

          <div style={{
                  position: 'absolute',
                  bottom: 0,
              }}>
            <ForceGraph2D
              graphData={{ nodes: gdata, links: links }}
              height = {600}
              nodeAutoColorBy="sentiment"
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id;
                const fontSize = 12/globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.color;
                ctx.fillText(label, node.x, node.y);

                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
              }}

              nodePointerAreaPaint={(node, color, ctx) => {
                ctx.fillStyle = color;
                const bckgDimensions = node.__bckgDimensions;
                bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
              }}
            />
          </div>
      </div>

    /*<div className="App">
      <header className="App-header">
        {}
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Node INFO: {profileData.node_info}</p>
              <p>Link INFO: {profileData.link_info}</p>
            </div>
        }
         {}
      </header>
    </div>*/

  );



}

export default App;
