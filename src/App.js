import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import {ForceGraph2D} from 'react-force-graph';
import graphData from './Components/graphcopy.json';
import data from './Components/miserables.json'
function App() {

/*
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        node_info: res.directed,
        link_info: res.multigraph}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    */

    //end of new line 
  return (
      <div>
        <ForceGraph2D
          graphData={graphData}
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
