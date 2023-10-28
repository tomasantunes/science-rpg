import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Select from 'react-select';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Tasks() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [tasks, setTasks] = useState([]);
  const [selectedTaskType, setSelectedTaskType] = useState();

  const taskTypes = [
    {value: "single", label: "Single"},
    {value: "recurrent", label: "Recurrent"}
  ];

  function changeSelectedGoal(goal) {

  }

  function changeSelectedTaskType(taskType) {

  }

  function loadGoals() {

  }

  function addTask() {

  }

  useEffect(() => {
    loadGoals();
  }, [])
  return (
    <>
      <Navbar />
      
      <div className="medium-container">
        <h2>Tasks</h2>
        <Select options={goals} value={selectedGoal} onChange={changeSelectedGoal} className="my-2" />
        <table className="table table-striped table-bordered align-middle tasks">
          <thead class="table-dark">
              <tr>
                  <th>Task</th>
                  <th>Type</th>
                  <th>XP</th>
                  <th>Complete</th>
                  <th>Options</th>
              </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr>
                <td>{task.description}</td>
                <td>{task.type}</td>
                <td>{task.xp}</td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" className="form-control" placeholder="Add a new task" />
              </td>
              <td>
                <Select options={taskTypes} value={selectedTaskType} onChange={changeSelectedTaskType} />
              </td>
              <td>
                <input type="text" className="form-control" placeholder="Set the XP" />
              </td>
              <td></td>
              <td>
                <button className="btn btn-success" onClick={addTask}>Add</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}
