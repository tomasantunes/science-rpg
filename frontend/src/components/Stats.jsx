import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import config from '../config.json';
import axios from 'axios';

export default function Stats() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [nextLevelXp, setNextLevelXp] = useState(0);
  const [nrSkills, setNrSkills] = useState(0);
  const [nrGoalsCompleted, setNrGoalsCompleted] = useState(0);
  const [nrItems, setNrItems] = useState(0);

  function loadStats() {
    axios.get(config.BASE_URL + '/api/get-stats')
    .then(function(response) {
      setXp(response.data.data.xp);
      setLevel(response.data.data.level);
      setNextLevelXp(response.data.data.next_level_xp);
      setNrSkills(response.data.data.nr_skills);
      setNrGoalsCompleted(response.data.data.nr_goals_completed);
      setNrItems(response.data.data.nr_items);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  useEffect(() => {
    loadStats();
  }, [])
  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="small-container">
          <h2>Stats</h2>
          <p><b>XP: </b>{xp}</p>
          <p><b>Level: </b>{level}</p>
          <p><b>Next Level XP: </b>{nextLevelXp}</p>
          <p><b>Nr. Of Skills: </b>{nrSkills}</p>
          <p><b>Goals completed: </b>{nrGoalsCompleted}</p>
          <p><b>Nr. Of Items: </b>{nrItems}</p>
        </div>
      </div>
    </>
    
  )
}
