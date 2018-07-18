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
    room: '',
    onlinePeople: [
      {
        name: 'test',
        id: 0
      },
      {
        name: 'other',
        id: 1
      },
      {
        name: 'foo',
        id: 2
      },
      {
        name: 'bar',
        id: 3
      }
    ]
  }

  constructor(props, context) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.renderPeople = this.renderPeople.bind(this)
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

  renderPeople() {
    return this.state.onlinePeople.map(({name, id}) => (
      <li key={id} onClick={() => this.setRooms(name)}>{name}</li>
    ))
  }

  joinRoom() {
    socket.emit('enter room', {
      room: this.state.room
    })
  }

  setRooms(name) {
    this.setState({
      room: name
    }, () => {
      console.log('changed rooms', this.state.room)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>hihihhi</h1>
        <input type="text" name="room" onChange={this.handleInputChange} placeholder="create a new room?" />
        <button onClick={this.checkRooms}>check available rooms</button>
        <button onClick={this.joinRoom}>Join the room</button>
        <ul>
          {this.state.onlinePeople ? this.renderPeople() : ''}
        </ul>
      </div>
    );
  }
}

export default App;
