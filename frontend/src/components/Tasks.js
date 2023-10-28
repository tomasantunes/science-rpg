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
  const [newAction, setNewAction] = useState({
    task_id: null,
    action: "",
    report: "",
    completes_task: false,
    completed_at: null,
  });

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

  function addAction(taskId) {
    $(".addActionModal").modal("show");    
  }

  function closeAddAction() {
    $(".addActionModal").modal("hide");
  }

  function submitAddAction(e) {

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

  function changeNewActionCompletesTask(e) {
    setNewAction({
      ...newAction,
      completes_task: e.target.checked
    });
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
                <td>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Options
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" onClick={() => { addAction(task.id) }}>Add Action</a></li>
                    </ul>
                  </div>
                </td>
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
