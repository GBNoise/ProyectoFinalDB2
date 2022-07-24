import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './app.scss';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { Home } from './components/Home';
import { Productores } from './components/Productores';
import { GlobalContext } from './contexts/globalContext';
import { Finca } from './components/Finca';
import { Productor } from './components/Productor';
import { Lotes } from './components/Lotes';
import { TipoDeSuelo } from './components/TipoDeSuelo';
import { TipoDeRiego } from './components/TIpoDeRiego';
import { Productos } from './components/Productos';
import { Cliente } from './components/Clientes';
import { Bancos } from './components/Bancos';
import { CuentasBancarias } from './components/CuentasBancarias';
import { TipoDeMoneda } from './components/TipoDeMoneda';
import { Bodegas } from './components/Bodegas';
import { Inventarios } from './components/Inventarios';
import { Proveedores } from './components/Proveedores';
import { Cheques } from './components/Cheques';
import { Compras } from './components/Compras';
import { Ventas } from './components/Ventas';
import { Chart } from './components/Chart';

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
          <Route path="/tipodesuelo" element={<TipoDeSuelo />} />
          <Route path="/tipoderiego" element={<TipoDeRiego />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/bancos" element={<Bancos />} />
          <Route path="/cuentasbancarias" element={<CuentasBancarias />} />
          <Route path="/tipodemoneda" element={<TipoDeMoneda />} />
          <Route path="/bodega" element={<Bodegas />} />
          <Route path="/inventario" element={<Inventarios />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/cheques" element={<Cheques />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </GlobalContext>
    </Router>
  );
}
