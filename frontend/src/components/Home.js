import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import $ from 'jquery';

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
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Home</h2>
        <div style={{textAlign: "center"}}>
          <button className="btn btn-primary">Start</button>
        </div>
        {showQuest &&
          <div className="quest">
            {{quest}}
          </div>
        }
        {showReport &&
          <div className="report">
            <form>
              <div className="form-group">
                <label>Action</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Report</label>
                <textarea className="form-control" rows="5"></textarea>
              </div>
              <div style={{textAlign: "right"}}>
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        }
        {showQuestResponse &&
          <div className="quest-response">
            {{questResponse}}
          </div>
        }
      </div>
      {loading &&
        <div className="loading">Loading&#8230;</div>
      }
    </>
    
  )
}
