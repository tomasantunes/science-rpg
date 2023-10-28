import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';

export default function Goals() {
  const [goals, setGoals] = useState([]);

  function loadGoals() {

  }

  function addGoal() {

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
                  <th>Progress</th>
              </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr>
                <td>{goal.description}</td>
                <td>{goal.progress}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" className="form-control" placeholder="Add a new goal" />
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
