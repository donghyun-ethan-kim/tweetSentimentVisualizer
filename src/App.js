import React, { useState, useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import {ForceGraph2D} from 'react-force-graph';
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
        
    })
  }

  useEffect(() => {
    getData();
  }, []);

    //end of new line

  return (
      // <div> {gdata[gdata.length - 1]["sentiment"]} </div>

      <div>
        <ForceGraph2D
          graphData={{ nodes: gdata, links: links }}
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
