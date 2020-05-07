import React, { Component } from 'react';
import io from "socket.io-client";
import ChatBox from './ChatApplication/ChatBox'

const socket = io.connect("http://localhost:5000");
class App extends Component{
   render(){
      return(
         <div>
             <ChatBox/>
         </div>
      );
   }
}
export default App;