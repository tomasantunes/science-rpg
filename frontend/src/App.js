import './App.css';
import './Loading.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Tasks from './components/Tasks';
import TaskItems from './components/TaskItems';
import Actions from './components/Actions';
import Skills from './components/Skills';
import Inventory from './components/Inventory';
import Stats from './components/Stats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task-items" element={<TaskItems />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
