import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import $ from 'jquery';
import config from '../config';
import axios from 'axios';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    description: "",
    priority: "",
  });

  function loadGoals() {
    axios.get(config.BASE_URL + "/api/goals")
    .then((response) => {
      setGoals(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function changeNewGoalDescription(e) {
    setNewGoal({
      ...newGoal,
      description: e.target.value
    });
  }

  function changeNewGoalPriority(e) {
    setNewGoal({
      ...newGoal,
      priority: e.target.value
    });
  }

  function addGoal() {
    axios.post(config.BASE_URL + "/api/add-goal", newGoal)
    .then((response) => {
      loadGoals();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    loadGoals();
  }, [])
  return (
    <>
      <Navbar />
      <div className="small-container">
        <h2>Goals</h2>
        <table className="table table-striped table-bordered align-middle tasks">
          <thead class="table-dark">
              <tr>
                  <th>Goal</th>
                  <th>Priority</th>
                  <th>Progress</th>
              </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr>
                <td>{goal.description}</td>
                <td>{goal.priority}</td>
                <td>{goal.progress}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" className="form-control" value={newGoal.description} onChange={changeNewGoalDescription} placeholder="Add a new goal" />
              </td>
              <td>
                <input type="text" className="form-control" value={newGoal.priority} onChange={changeNewGoalPriority} placeholder="Set priority" />
              </td>
              <td>
                <button className="btn btn-success" onClick={addGoal}>Add</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
    
  )
}
