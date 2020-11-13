import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    events: []
  }

  constructor() {
    super();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const URL = 'https://api.bizzabo.com/api/events'
    const proxiedURL = proxyURL + URL

    axios.get(proxiedURL, {
      headers: {
        'Accept': 'application/vnd.bizzabo.v2.0+json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BIZZABO_API_KEY
      }
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bizzabo Data</h1>
        </header>
      </div>
    );
  }
}

export default App;
