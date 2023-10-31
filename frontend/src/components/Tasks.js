import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import Select from 'react-select';
import $ from 'jquery';
import config from '../config';
import axios from 'axios';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Tasks() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [tasks, setTasks] = useState([]);
  const [selectedTaskType, setSelectedTaskType] = useState();
  const [newTask, setNewTask] = useState({
    goal_id: null,
    description: "",
    type: "",
    xp: ""
  });
  const [newAction, setNewAction] = useState({
    task_id: null,
    action: "",
    report: "",
    xp: "",
    qtt: "",
    completes_task: false
  });

  const taskTypes = [
    {value: "single", label: "Single"},
    {value: "recurrent", label: "Recurrent"}
  ];

  function changeSelectedGoal(goal) {
    setSelectedGoal(goal);
    setNewTask({
      ...newTask,
      goal_id: goal.value
    });
    loadTasks(goal.value);
  }

  function changeSelectedTaskType(taskType) {
    setSelectedTaskType(taskType);
    setNewTask({
      ...newTask,
      type: taskType.value
    });
  }

  function changeNewTaskDescription(e) {
    setNewTask({
      ...newTask,
      description: e.target.value
    });
  }

  function changeNewTaskXp(e) {
    setNewTask({
      ...newTask,
      xp: e.target.value
    });
  }

  function loadGoals() {
    axios.get(config.BASE_URL + "/api/goals")
    .then((response) => {
      var goals_arr = [];
      for (var i in response.data.data) {
        goals_arr.push({value: response.data.data[i].id, label: response.data.data[i].description});
      }
      setGoals(goals_arr);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function addTask() {
    axios.post(config.BASE_URL + "/api/add-task", newTask)
    .then((response) => {
      setNewTask({
        goal_id: selectedGoal.value,
        description: "",
        type: "",
        xp: ""
      });
      loadTasks(selectedGoal.value);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function addAction(taskId) {
    var task_to_add_action = tasks.find((task) => task.id == taskId);
    setNewAction({
      ...newAction,
      task_id: task_to_add_action.id,
      xp: task_to_add_action.xp
    });
    $(".addActionModal").modal("show");    
  }

  function closeAddAction() {
    $(".addActionModal").modal("hide");
  }

  function submitAddAction(e) {
    e.preventDefault();
    axios.post(config.BASE_URL + "/api/add-action", newAction)
    .then((response) => {
      loadTasks(selectedGoal.value);
      setNewAction({
        task_id: null,
        action: "",
        report: "",
        xp: "",
        qtt: "",
        completes_task: false
      });
      closeAddAction();
      alert("Action added.");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function changeNewActionAction(e) {
    setNewAction({
      ...newAction,
      action: e.target.value
    });     
  }

  function changeNewActionReport(e) {
    setNewAction({
      ...newAction,
      report: e.target.value
    });
  }

  function changeNewActionQtt(e) {
    setNewAction({
      ...newAction,
      qtt: e.target.value
    });
  }

  function changeNewActionCompletesTask(e) {
    setNewAction({
      ...newAction,
      completes_task: e.target.checked
    });
  }

  function deleteTask(taskId) {
    if (window.confirm("Are you sure you want to delete this task?") == true) {
      axios.post(config.BASE_URL + "/api/delete-task", {task_id: taskId})
      .then((response) => {
        loadTasks(selectedGoal.value);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function loadTasks(goalId) {
    axios.get(config.BASE_URL + "/api/tasks/" + goalId)
    .then((response) => {
      setTasks(response.data.data);
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
      <Sidebar />
      <div className="page">
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
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Options
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#" onClick={() => { addAction(task.id) }}>Add Action</a></li>
                        <li><a class="dropdown-item" href="#" onClick={() => { deleteTask(task.id) }}>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <input type="text" className="form-control" value={newTask.description} onChange={changeNewTaskDescription} placeholder="Add a new task" />
                </td>
                <td>
                  <Select options={taskTypes} value={selectedTaskType} onChange={changeSelectedTaskType} />
                </td>
                <td>
                  <input type="text" className="form-control" value={newTask.xp} onChange={changeNewTaskXp} placeholder="Set the XP" />
                </td>
                <td></td>
                <td>
                  <button className="btn btn-success" onClick={addTask}>Add</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="modal addActionModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Action</h5>
              <button type="button" class="btn-close" onClick={closeAddAction} aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={submitAddAction}>
                <div className="form-group py-2">
                  <label className="control-label">Action</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="action" value={newAction.action} onChange={changeNewActionAction}/>
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Report</label>
                  <div>
                      <textarea className="form-control input-lg" name="report" value={newAction.report} onChange={changeNewActionReport} />
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Quantity</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="qtt" value={newAction.qtt} onChange={changeNewActionQtt}/>
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Completes Task</label>
                  <div>
                      <input type="checkbox" name="completes_task" checked={newAction.completes_task} onChange={changeNewActionCompletesTask}/>
                  </div>
                </div>
                <div className="form-group">
                    <div style={{textAlign: "right"}}>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
