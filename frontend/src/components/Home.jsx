import React, {useEffect, useState, useRef} from 'react'
import Sidebar from './Sidebar';
import config from '../config.json';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Home() {
  const [quest, setQuest] = useState({
    text: "",
    id: null
  });
  const [questResponse, setQuestResponse] = useState({
    text: "",
    id: null
  });
  const [taskDescription, setTaskDescription] = useState('');
  const [showQuest, setShowQuest] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showQuestResponse, setShowQuestResponse] = useState(false);
  const [audioSource, setAudioSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [newAction, setNewAction] = useState({
    action: "",
    report: "",
    completes_task: false,
    qtt: 1
  });
  const audioRef = useRef();

  function loadQuest() {
    setLoading(true);
    axios.post(config.BASE_URL + "/api/get-quest")
    .then((response) => {
      setLoading(false);
      if (response.data.status == "OK") {
        setQuest({
          text: response.data.data.quest,
          id: response.data.data.post_id
        });
        setNewAction({
          ...newAction,
          task_id: response.data.data.task_id,
          xp: response.data.data.xp
        })
        setTaskDescription(response.data.data.task_description)
        setShowQuest(true);
        setShowReport(true);
      }
      else {
        alert(response.data.error);
      }
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
      alert(err.message);
    });
  }

  function listen(id) {
    axios.get(config.BASE_URL + '/api/text-to-speech', {params: {id}})
    .then(function(response) {
      if (response.data.status == "OK") {
        updateAudio(config.BASE_URL + "/api/get-audio/?id=" + id);
      }
      else {
        alert(response.data.error);
      }
    });
  }

  const updateAudio = (source) => {
    console.log(source);
    setAudioSource(source);
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
      setQuestResponse({
        text: response.data.data.feedback,
        id: response.data.data.post_id
      });
      setShowQuestResponse(true);
      setLoading(false);
      MySwal.fire("You have won " + newAction.xp + " XP.");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function reload() {
    window.location.reload();
  }

  useEffect(() => {
    if(audioSource != "" && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    } 
  }, [audioSource]);

  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="container">
          <h2>Home</h2>
          <div style={{textAlign: "center"}}>
            <button className="btn btn-primary btn-lg" onClick={loadQuest}>Start</button>
          </div>
          {showQuest &&
            <div className="quest">
              <div style={{textAlign: "right"}}>
                <button className="btn btn-primary btn-sm" onClick={(e) => listen(quest.id)}>Listen</button>
              </div>
              <p><b>{taskDescription}</b></p>
              {quest.text}
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
            <>
              <div className="quest-response mb-2">
                <div style={{textAlign: "right"}}>
                  <button className="btn btn-primary btn-sm" onClick={(e) => listen(questResponse.id)}>Listen</button>
                </div>
                {questResponse.text}
              </div>
              <div style={{textAlign: "center"}}>
                <button className="btn btn-primary btn-lg" onClick={reload}>Reload</button>
              </div>
            </>
          }
        </div>
        {loading &&
          <div className="loading">Loading&#8230;</div>
        }
        <audio controls="controls" style={{visibility: "hidden"}} ref={audioRef}>
          <source src={audioSource} type="audio/mp3"></source>
          Your browser does not support the audio format.
        </audio>
      </div>
    </>
    
  )
}
