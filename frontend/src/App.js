import './App.css';
import './Loading.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Goals from './components/Goals';
import Tasks from './components/Tasks';
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
        <Route path="/goals" element={<Goals />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
