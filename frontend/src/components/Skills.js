import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Skills() {
  const [skills, setSkills] = useState([]);

  function loadSkills() {

  }

  function addSkill() {

  }

  useEffect(() => {
    loadSkills();
  }, [])
  return (
    <>
      <Navbar />
      <div className="small-container">
        <h2>Skills</h2>
        <table className="table table-striped table-bordered align-middle tasks">
          <thead class="table-dark">
              <tr>
                  <th>Skill</th>
                  <th>Progress</th>
              </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr>
                <td>{skill.skill_name}</td>
                <td>{skill.percentage}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" className="form-control" placeholder="Add a new skill" />
              </td>
              <td>
                <button className="btn btn-success" onClick={addSkill}>Add</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
    
  )
}
