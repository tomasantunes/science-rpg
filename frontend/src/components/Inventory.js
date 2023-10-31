import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import $ from 'jquery';
import config from '../config';
import axios from 'axios';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Goals() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    item_name: "",
    description: "",
    qtt: ""
  });

  const [editItem, setEditItem] = useState({
    id: null,
    item_name: "",
    description: "",
    qtt: ""
  });

  function loadItems() {
    axios.get(config.BASE_URL + "/api/inventory")
    .then((response) => {
      setItems(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function addItem() {
    $(".addItemModal").modal("show");
  }

  function closeAddItem() {
    $(".addItemModal").modal("hide");
  }

  function changeNewItemName(e) {
    setNewItem({
      ...newItem,
      item_name: e.target.value
    });
  }

  function changeNewItemDescription(e) {
    setNewItem({
      ...newItem,
      description: e.target.value
    });
  }

  function changeNewItemQtt(e) {
    setNewItem({
      ...newItem,
      qtt: e.target.value
    });
  }

  function submitAddItem(e) {
    e.preventDefault();
    axios.post(config.BASE_URL + "/api/add-item", newItem)
    .then((response) => {
      setNewItem({
        item_name: "",
        description: "",
        qtt: ""
      });
      loadItems();
      closeAddItem();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function showEditItem(id) {
    var item_to_edit = items.find((item) => item.id == id);
    setEditItem(item_to_edit);
    $(".editItemModal").modal("show");
  }

  function closeEditItem() {
    $(".editItemModal").modal("hide");
  }

  function changeEditItemName(e) {
    setEditItem({
      ...editItem,
      item_name: e.target.value
    });
  }

  function changeEditItemDescription(e) {
    setEditItem({
      ...editItem,
      description: e.target.value
    });
  }

  function changeEditItemQtt(e) {
    setEditItem({
      ...editItem,
      qtt: e.target.value
    });
  }

  function deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this item?") == true) {
      axios.post(config.BASE_URL + "/api/delete-item", {id: id})
      .then((response) => {
        loadItems();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function submitEditItem(e) {
    e.preventDefault();
    axios.post(config.BASE_URL + "/api/edit-item", editItem)
    .then((response) => {
      loadItems();
      closeEditItem();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    loadItems();
  }, [])
  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="medium-container">
          <h2>Items</h2>
          <table className="table table-striped table-bordered align-middle tasks">
            <thead class="table-dark">
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr>
                  <td>{item.item_name}</td>
                  <td>{item.description}</td>
                  <td>{item.qtt}</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Options
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#" onClick={() => { showEditItem(item.id) }}>Edit</a></li>
                        <li><a class="dropdown-item" href="#" onClick={() => { deleteItem(item.id) }}>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button className="btn btn-success" onClick={addItem}>Add</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="modal addItemModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Item</h5>
              <button type="button" class="btn-close" onClick={closeAddItem} aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={submitAddItem}>
                <div className="form-group py-2">
                  <label className="control-label">Item Name</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="item_name" value={newItem.item_name} onChange={changeNewItemName}/>
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Description</label>
                  <div>
                      <textarea className="form-control input-lg" name="description" value={newItem.description} onChange={changeNewItemDescription} />
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Quantity</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="description" value={newItem.qtt} onChange={changeNewItemQtt} />
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
      <div class="modal editItemModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Item</h5>
              <button type="button" class="btn-close" onClick={closeEditItem} aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={submitEditItem}>
                <div className="form-group py-2">
                  <label className="control-label">Item Name</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="item_name" value={editItem.item_name} onChange={changeEditItemName}/>
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Description</label>
                  <div>
                  <input type="text" className="form-control input-lg" name="description" value={editItem.description} onChange={changeEditItemDescription}/>
                  </div>
                </div>
                <div className="form-group py-2">
                  <label className="control-label">Quantity</label>
                  <div>
                  <input type="text" className="form-control input-lg" name="description" value={editItem.qtt} onChange={changeEditItemQtt}/>
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

