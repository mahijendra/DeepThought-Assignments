
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001"); //connecting our frontend to backend that is socket.io server

function App() {
    const [username, setUsername] = useState(""); // Represents username
    const [room, setRoom] = useState(""); //Represents room
    const [showChat, setShowChat] = useState(false);

    // Joining room
    const joinRoom = () => {
        //You can only join the room if there is a username and especially room as well
        if (username !== "" && room !== "") {
            // Here we're emitting the data by passing the name and the data, Here second argument to the emit function works as data.
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="John..."
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default App;