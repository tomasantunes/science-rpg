import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import $ from 'jquery';
import config from '../config';
import axios from 'axios';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Actions() {
  const [actions, setActions] = useState([]);

  function loadActions() {
    axios.get(config.BASE_URL + "/api/actions")
    .then((response) => {
      setActions(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function deleteAction(id) {
    if (window.confirm("Are you sure you want to delete this action?") == true) {
      axios.post(config.BASE_URL + "/api/delete-action", {id: id})
      .then((response) => {
        loadActions();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    loadActions();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="small-container">
          <h2>Actions</h2>
            {actions.map((action) => (
              <div className="action">
                <div style={{textAlign: "right"}}>
                  <button className="btn btn-danger" onClick={(e) => { deleteAction(action.id); }}>Delete</button>
                </div>
                <h4>{action.action}</h4>
                <p>{action.report}</p>
                <p><b>{action.xp} XP</b></p>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
