import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import {Link, useNavigate} from 'react-router-dom';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
          <h3><b>Science RPG</b></h3>
          <ul className="menu">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/goals">Goals</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/actions">Actions</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/inventory">Inventory</Link></li>
              <li><Link to="/stats">Stats</Link></li>
          </ul>
      </div>
    </>
  )
}
