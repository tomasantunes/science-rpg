import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Stats() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [nrSkills, setNrSkills] = useState(0);
  const [nrGoalsCompleted, setNrGoalsCompleted] = useState(0);

  function loadStats() {

  }

  useEffect(() => {
    loadStats();
  }, [])
  return (
    <>
      <Navbar />
      <div className="small-container">
        <h2>Stats</h2>
        <p><b>XP: </b>{xp}</p>
        <p><b>Level: </b>{level}</p>
        <p><b>Nr. Of Skills: </b>{nrSkills}</p>
        <p><b>Goals completed: </b>{nrGoalsCompleted}</p>
      </div>
    </>
    
  )
}
