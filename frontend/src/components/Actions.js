import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
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

  useEffect(() => {
    loadActions();
  }, []);
  return (
    <>
      <Navbar />
      <div className="small-container">
        <h2>Actions</h2>
        <ul className="actions">
          {actions.map((action) => (
            <li>
              <h4>{action.action}</h4>
              <p>{action.report}</p>
              <p><b>{action.xp} XP</b></p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
