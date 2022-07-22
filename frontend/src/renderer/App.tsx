import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { Home } from './components/Home';
import { Productores } from './components/Productores';
import { GlobalContext } from './contexts/globalContext';
import { Finca } from './components/Finca';
import { Productor } from './components/Productor';
import { Lotes } from './components/Lotes';

export default function App() {
  return (
    <Router>
      <GlobalContext>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productores" element={<Productores />} />
          <Route path="/productor/:productorID" element={<Productor />} />
          <Route path="/finca" element={<Finca />} />
          <Route path="/finca/:fincaID" element={<Home />} />
          <Route path="/lote" element={<Lotes />} />
        </Routes>
      </GlobalContext>
    </Router>
  );
}
