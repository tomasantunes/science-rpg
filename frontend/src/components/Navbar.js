import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
          <a class="navbar-brand" href="#">Science RPG</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink to="/home" className="nav-link">Home</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/task-items" className="nav-link">Task Items</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/actions" className="nav-link">Actions</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/skills" className="nav-link">Skills</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/inventory" className="nav-link">Inventory</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/stats" className="nav-link">Stats</NavLink>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  )
}