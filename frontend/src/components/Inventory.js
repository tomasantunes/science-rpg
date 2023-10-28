import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
window.bootstrap = require('bootstrap');

export default function Goals() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    item_name: "",
    description: ""
  });

  function loadItems() {

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

  function submitAddItem(e) {

  }

  useEffect(() => {
    loadItems();
  }, [])
  return (
    <>
      <Navbar />
      <div className="small-container">
        <h2>Items</h2>
        <table className="table table-striped table-bordered align-middle tasks">
          <thead class="table-dark">
              <tr>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Options</th>
              </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>
                <button className="btn btn-success" onClick={addItem}>Add</button>
              </td>
            </tr>
          </tfoot>
        </table>
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

