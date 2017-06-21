import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React!!</p>;
  }
}

render(<App/>, document.getElementById('app'));
console.log('Console');

 window.WebSocket = window.WebSocket || window.MozWebSocket;

  // if browser doesn't support WebSocket, just show
  // some notification and exit
  if (!window.WebSocket) {
    console.log('No WebSocket');
  }

  // open connection
  var connection = new WebSocket('ws://127.0.0.1:1337');
  console.log('WebSocket Start');

  connection.onopen = function () {
    // first we want users to enter their names
	console.log('WebSocket Connection');
  };

  connection.onerror = function (error) {
    console.log('WebSocket Error:', error);
  };

  // most important part - incoming messages
  connection.onmessage = function (message) {
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('WebSocket Error: Invalid JSON:', message.data);
    }
	
	console.log('WebSocket Result:', message.data);
  };
  
  connection.send(JSON.stringify({data: "data"}));