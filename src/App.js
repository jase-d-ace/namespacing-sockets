import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080')

// found my answers here:
// https://socket.io/docs/rooms-and-namespaces/
// https://stackoverflow.com/questions/24154480/how-to-update-socket-object-for-all-clients-in-room-socket-io/25028902#25028902

class App extends Component {

  state = {
    room: ''
  }

  constructor(props, context) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  componentDidMount() {
    socket.emit('enter room', {
      room: 'somewhere new'
    })
    socket.on('open rooms', ({open_rooms}) => {
      console.log('open rooms are...', open_rooms)
    })
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  joinRoom() {
    socket.emit('enter room', {
      room: this.state.room
    })
  }

  checkRooms() {
    socket.emit('check rooms')
  }

  render() {
    return (
      <div className="App">
        <h1>hihihhi</h1>
        <input type="text" name="room" onChange={this.handleInputChange} placeholder="create a new room?" />
        <button onClick={this.checkRooms}>check available rooms</button>
        <button onClick={this.joinRoom}>Join the room</button>
      </div>
    );
  }
}

export default App;
