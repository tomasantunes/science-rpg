import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar';
import $ from 'jquery';
import config from '../config.json';
import axios from 'axios';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Home() {
  const [quest, setQuest] = useState('');
  const [questResponse, setQuestResponse] = useState('');
  const [showQuest, setShowQuest] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showQuestResponse, setShowQuestResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAction, setNewAction] = useState({
    action: "",
    report: "",
    completes_task: false
  });

  function loadQuest() {
    setLoading(true);
    axios.post(config.BASE_URL + "/api/get-quest")
    .then((response) => {
      setLoading(false);
      setQuest(response.data.data.quest);
      setNewAction({
        ...newAction,
        task_id: response.data.data.task_id,
        xp: response.data.data.xp
      })
      setShowQuest(true);
      setShowReport(true);
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

  function changeNewActionCompletesTask(e) {
    setNewAction({
      ...newAction,
      completes_task: e.target.checked
    });
  }

  function changeNewActionReport(e) {
    setNewAction({
      ...newAction,
      report: e.target.value
    });
  }

  function addAction(e) {
    e.preventDefault();
    setLoading(true);
    axios.post(config.BASE_URL + "/api/add-action", newAction)
    .then((response) => {
      console.log("Action has been added to the database.");
    })
    .catch((err) => {
      console.log(err);
    });
    axios.post(config.BASE_URL + "/api/get-report-feedback", newAction)
    .then((response) => {
      setQuestResponse(response.data.data);
      setShowQuestResponse(true);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }



  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="container">
          <h2>Home</h2>
          <div style={{textAlign: "center"}}>
            <button className="btn btn-primary" onClick={loadQuest}>Start</button>
          </div>
          {showQuest &&
            <div className="quest">
              {quest}
            </div>
          }
          {showReport &&
            <div className="report">
              <form onSubmit={addAction}>
                <div className="form-group my-2">
                  <label>Action</label>
                  <input type="text" value={newAction.action} onChange={changeNewActionAction} className="form-control" />
                </div>
                <div className="form-group my-2">
                  <label>Report</label>
                  <textarea className="form-control" value={newAction.report} onChange={changeNewActionReport} rows="5"></textarea>
                </div>
                <div className="form-group my-2">
                  <label>Completes Task</label><br/>
                  <input type="checkbox" checked={newAction.completes_task} onChange={changeNewActionCompletesTask} />
                </div>
                <div style={{textAlign: "right", marginBottom: "10px"}}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          }
          {showQuestResponse &&
            <div className="quest-response">
              {questResponse}
            </div>
          }
        </div>
        {loading &&
          <div className="loading">Loading&#8230;</div>
        }
      </div>
    </>
    
  )
}
