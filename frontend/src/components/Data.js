import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import $ from 'jquery';
import config from '../config';
import axios from 'axios';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Data() {
  const [data, setData] = useState([]);
  const [newDataEntry, setNewDataEntry] = useState({
    description: "",
    qtt_desc: "",
  });

  function loadData() {
    axios.get(config.BASE_URL + "/api/data")
    .then((response) => {
      setData(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function changeNewDataEntryDescription(e) {
    setNewDataEntry({
      ...newDataEntry,
      description: e.target.value
    });
  }

  function changeNewDataEntryQttDesc(e) {
    setNewDataEntry({
      ...newDataEntry,
      qtt_desc: e.target.value
    });
  }

  function addDataEntry() {
    axios.post(config.BASE_URL + "/api/add-data-entry", newDataEntry)
    .then((response) => {
      loadData();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function deleteDataEntry(id) {
    if (window.confirm("Are you sure you want to delete this data entry?") == true) {
      axios.post(config.BASE_URL + "/api/delete-data-entry", {id: id})
      .then((response) => {
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    loadData();
  }, [])
  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="small-container">
          <h2>Data</h2>
          <table className="table table-striped table-bordered align-middle tasks">
            <thead class="table-dark">
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr>
                  <td>{entry.description}</td>
                  <td>{entry.qtt_desc}</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Options
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#" onClick={() => { deleteDataEntry(entry.id) }}>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <input type="text" className="form-control" value={newDataEntry.description} onChange={changeNewDataEntryDescription} placeholder="Add a new data entry" />
                </td>
                <td>
                  <input type="text" className="form-control" value={newDataEntry.qtt_desc} onChange={changeNewDataEntryQttDesc} placeholder="Set quantity" />
                </td>
                <td>
                  <button className="btn btn-success" onClick={addDataEntry}>Add</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
    
  )
}

