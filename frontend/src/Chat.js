import React, { useEffect } from 'react'
import { useState } from 'react';

function Chat(props) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: props.room,
                author: props.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await props.socket.emit("send_message", messageData )
            setMessageList((list) => {
                return [...list, messageData]
            })
        }
    };

    useEffect(() => {
        props.socket.on("receive_message", (message) => {
            setMessageList((list) => {
                return [...list, message]
            })
        })
    }, [props.socket])

    return (   
    <div className='chat-window'>
       <div className='chat-header'>
        <p>Live Chat</p>
       </div>
       <div className="chat-body">
            {messageList.map((message) => {
               return (
               <div className='message' id={props.username === message.author ? "me" : "other" }>
                    <div>
                        <div className="message-content">
                            <p>{message.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="author">{message.author} </p>
                            <p id="time">{message.time} </p>
                        </div>
                    </div>
               </div>
               )
            })}
       </div>
       <div className="chat-footer">
        <input 
            type="text" 
            placeholder='Hey'
            onChange={(e) => {
                setCurrentMessage(e.target.value)
                }}
            onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
            }}
        />
        <button onClick={sendMessage}>&#9658;</button>
       </div>
    </div>
  )
}

export default Chat