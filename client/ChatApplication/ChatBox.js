import React, { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

class ChatBox extends Component {
  constructor() {
    super();
    this.state = { msg: "", chat: [], name: "" };
  }

  componentDidMount() {
    socket.on("chat message", ({ id,name, msg }) => {
      this.setState({
        chat: [ { id,name, msg },...this.state.chat]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = () => {
    const { name, msg } = this.state;
    socket.emit("chat message", { name, msg });
    this.setState({ msg: "" });
  };

  render() {
    const { chat } = this.state;
    return (
      <div>
        <span>Name : </span>
        <input
          name="name"
          onChange={e => this.onTextChange(e)}
          value={this.state.name}
        /><br/><br/>
        <span>Message : </span>
        <input
          name="msg"
          onChange={e => this.onTextChange(e)}
          value={this.state.msg}
        />
        <button onClick={this.onMessageSubmit}>Send</button><br/><br/>
        <div>
        {chat.map(({ id, name, msg }) => (
          <div>{name}<span style={{color : "red" }}> ({id}) </span> : {msg}<br/><br/></div>
        ))}
          </div></div>
        );
        
  }
}

export default ChatBox;