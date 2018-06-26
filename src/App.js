import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080')

// found my answers here:
// https://socket.io/docs/rooms-and-namespaces/
// https://stackoverflow.com/questions/24154480/how-to-update-socket-object-for-all-clients-in-room-socket-io/25028902#25028902

class App extends Component {

  componentDidMount() {
    socket.emit('enter room', {
      room: 'test room'
    })
  }
  joinDifferentRoom() {
    socket.emit('enter room', {
      room: 'other room'
    })
  }
  checkClients() {
    socket.emit('check roster', {
      room: 'test room'
    })
  }
  checkOtherClients() {
    socket.emit('check roster', {
      room: 'other room'
    })
  }
  leaveRoom() {
    socket.emit('leave room', {
      room: 'test room'
    })
  }
  render() {
    return (
      <div className="App">
        <h1>hihihhi</h1>
        <button onClick={this.joinDifferentRoom}>Clickmepls</button>
        <button onClick={this.checkClients}>Clickmetoopls</button>
        <button onClick={this.checkOtherClients}>Clickmethreepls</button>
        <button onClick={this.leaveRoom}>Clickmefourpls</button>
      </div>
    );
  }
}

export default App;
