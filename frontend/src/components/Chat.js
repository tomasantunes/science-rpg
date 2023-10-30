import React, {useState} from 'react';
import Sidebar from './Sidebar';
import config from '../config';
import axios from 'axios';

export default function Chat() {
  const [chatInput, setChatInput] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  function changeChatInput(e) {
    setChatInput(e.target.value);
  }

  function send() {
    setLoading(true);
    axios.post(config.BASE_URL + "/api/get-chat-response", {chat_input: chatInput})
    .then((response) => {
      setLoading(false);
      setChatAnswer(response.data.data);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h3>Chat</h3>
        <div className="chat-input">
          <textarea className="form-control" placeholder="Type a message..." value={chatInput} onChange={changeChatInput} /><br/>
          <div style={{textAlign: "right"}}>
            <button className="btn btn-primary" onClick={send}>Send</button>
          </div>
        </div>
        <div className="chat-answer">
          {chatAnswer}
        </div>
      </div>
      {loading &&
        <div className="loading">Loading&#8230;</div>
      }
    </>
  )
}
