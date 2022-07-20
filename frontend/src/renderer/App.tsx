import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { Home } from './components/Home';
import { Productores } from './components/Productores';
import { GlobalContext } from './contexts/globalContext';
import { Finca } from './components/Finca';

export default function App() {
  return (
    <Router>
      <GlobalContext>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productores" element={<Productores />} />
          <Route path="/finca" element={<Finca />} />
        </Routes>
      </GlobalContext>
    </Router>
  );
}
