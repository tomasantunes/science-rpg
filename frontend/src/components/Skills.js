import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    skill_name: "",
    skill_percentage: 0
  });
  const [editSkill, setEditSkill] = useState({
    skill_name: "",
    skill_percentage: 0
  });

  function loadSkills() {

  }

  function addSkill() {

  }

  function showEditSkill(id) {
    $(".editSkillModal").modal("show");
  }

  function closeEditSkill() {
    $(".editSkillModal").modal("hide");
  }

  function changeEditSkillName(e) {
    setEditSkill({
      ...editSkill,
      skill_name: e.target.value
    });
  }

  function changeEditSkillPercentage(e) {
    setEditSkill({
      ...editSkill,
      skill_percentage: e.target.value
    });
  }

  function submitEditSkill(e) {

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
                  <th>Options</th>
              </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr>
                <td>{skill.skill_name}</td>
                <td>{skill.percentage}</td>
                <td>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Options
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" onClick={() => { showEditSkill(skill.id) }}>Edit</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" className="form-control" placeholder="Add a new skill" />
              </td>
              <td></td>
              <td>
                <button className="btn btn-success" onClick={addSkill}>Add</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="modal editSkillModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Skill</h5>
              <button type="button" class="btn-close" onClick={closeEditSkill} aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={submitEditSkill}>
                <div className="form-group py-2">
                  <label className="control-label">Edit Skill</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="skill_name" value={editSkill.skill_name} onChange={changeEditSkillName}/>
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Progress</label>
                  <div>
                  <input type="text" className="form-control input-lg" name="skill_percentage" value={editSkill.skill_percentage} onChange={changeEditSkillPercentage}/>
                  </div>
                </div>
                <div className="form-group">
                    <div style={{textAlign: "right"}}>
                        <button type="submit" className="btn btn-primary">Submit</button>
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
