import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import graph from './Components/d3graph'
function App() {
/*
   // new line start
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
    //end of new line 

  return (
    <div className="App">
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
    </div>
  );
  */
  return (
    <div>
      <graph/>
    </div>
  );



}

export default App;
