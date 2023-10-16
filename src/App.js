import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaDeLibros from './Services/ListaDeLibros';
import BorrarLibro from './Services/BorrarLibro';
import EditarLibro from './Services/EditarLibro';
import CrearLibro from './Services/CrearLibro';
import BuscarLibro from './Services/BuscarLibro';

/**
 * Componente principal de la aplicación.
 *
 * Define la estructura general y las rutas de la aplicación.
 */
function App() {
  return (
    <Router>
      <div
        className='App'
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <header className='App-header'>
          <nav className='nav-container'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
            <Link to='/libros' className='nav-link'>
              Libros
            </Link>
            <Link to='/libros/crear' className='nav-link'>
              Registrar Libro
            </Link>
            <Link to='/libros/buscar' className='nav-link'>
              Buscar Libro
            </Link>
            {/* Otros enlaces si es necesario */}
          </nav>
        </header>
        <div className='content' style={{ flex: 1, overflowY: 'auto' }}>
          {/* Configuración de rutas */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/libros' element={<ListaDeLibros />} />
            <Route path='/libros/editar/:id' element={<EditarLibro />} />
            <Route path='/libros/:id' element={<BorrarLibro />} />
            <Route path='/libros/crear' element={<CrearLibro />} />
            <Route path='/libros/buscar' element={<BuscarLibro />} />
            {/* Más rutas si es necesario */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

/**
 * Componente para la página de inicio.
 */
function HomePage() {
  return (
    <div
      className='home-page'
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}></div>
  );
}

export default App;
