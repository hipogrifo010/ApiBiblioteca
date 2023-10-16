import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatearFecha } from '../Utils/FormatoFecha';
import axios from 'axios';

import '../Styles/Style.css';

/**
 * Componente BuscarLibro - Permite a los usuarios buscar libros en la base de datos.
 *
 * Los usuarios pueden buscar libros por ID, nombre o autor. Los resultados de la búsqueda,
 * si existen, se muestran en tarjetas que incluyen detalles del libro y opciones para editar o borrar.
 */
function BuscarLibro() {
  // Definición de estados iniciales para la búsqueda, los resultados y los mensajes de error.
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState({
    id: '',
    nombre: '',
    autor: '',
  });

  /**
   * Maneja los cambios en los campos de entrada de búsqueda actualizando el estado.
   *
   * @param {string} campo - El nombre del campo de búsqueda (id, nombre, autor).
   * @return {function} Una función que maneja el evento de cambio para el campo específico.
   */
  const manejarCambioBusqueda = (campo) => (evento) => {
    setBusqueda({
      ...busqueda,
      [campo]: evento.target.value,
    });
  };

  /**
   * Realiza la búsqueda comunicándose con la API y actualizando el estado con los resultados.
   *
   * Esta función construye los parámetros de búsqueda a partir del estado actual,
   * realiza la solicitud GET y maneja la respuesta o los errores.
   */
  const realizarBusqueda = async () => {
    try {
      // Limpiar errores anteriores y resultados de búsqueda.
      setError('');
      setLibros([]);

      // Construir los parámetros de búsqueda a partir del estado actual.
      const params = {};
      if (busqueda.id) params.id = busqueda.id;
      if (busqueda.nombre) params.nombre = busqueda.nombre;
      if (busqueda.autor) params.autor = busqueda.autor;

      // Realizar la solicitud GET a la API.
      const response = await axios.get(
        `http://localhost/codeigniter4/public/libros/buscar`,
        { params }
      );

      // Manejar la respuesta de la API.
      if (Array.isArray(response.data) && response.data.length > 0) {
        setLibros(response.data);
      } else {
        alert('No se encontraron libros.');
      }
    } catch (error) {
      setError(`Hubo un error al realizar la búsqueda: ${error.message}`);
    }
  };

  /**
   * Redirige al usuario a la página de edición para el libro seleccionado.
   *
   * @param {Object} libro - El libro seleccionado.
   */
  const redirectToEdit = (libro) => {
    navigate(`/libros/editar/${libro.id_libro}`, { state: { libro } });
  };

  /**
   * Redirige al usuario a la página de confirmación de eliminación para el libro seleccionado.
   *
   * @param {Object} libro - El libro seleccionado.
   */
  const redirectToDelete = (libro) => {
    navigate(`/libros/${libro.id_libro}`, { state: { libro } });
  };

  // JSX para la interfaz de usuario del componente.
  return (
    <div className='main-container-search'>
      <div className='busqueda-container'>
        <div className={`busqueda card busqueda-card`}>
          {/* Campos de entrada para los criterios de búsqueda */}
          <div className='form-control'>
            <input
              type='text'
              value={busqueda.id}
              onChange={manejarCambioBusqueda('id')}
              placeholder='Buscar por ID...'
              className='campo-busqueda'
            />
          </div>
          <div className='form-control'>
            <input
              type='text'
              value={busqueda.nombre}
              onChange={manejarCambioBusqueda('nombre')}
              placeholder='Buscar por nombre...'
              className='campo-busqueda'
            />
          </div>
          <div className='form-control'>
            <input
              type='text'
              value={busqueda.autor}
              onChange={manejarCambioBusqueda('autor')}
              placeholder='Buscar por autor...'
              className='campo-busqueda'
            />
          </div>
          {/* Botón para activar la búsqueda */}
          <button onClick={realizarBusqueda} className='boton'>
            Buscar
          </button>
        </div>
      </div>
      <div
        className='resultados-container'
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        {error && <p className='mensaje-error'>{error}</p>}
        {libros.length ? (
          <div className='resultados'>
            {/* Se muestran tarjetas para cada libro encontrado */}
            {libros.map((libro, index) => (
              <div key={index} className='libro-card-container'>
                <div className='card imagen-card'>
                  <img
                    src={`${process.env.PUBLIC_URL}/Images/${encodeURIComponent(
                      libro.nombre
                    )}.jpg`}
                    alt={libro.nombre}
                  />
                </div>
                <div className='card detalles-card'>
                  <h2>{libro.nombre}</h2>
                  <p>Autor: {libro.autor}</p>
                  <p>
                    Fecha de Edición: {formatearFecha(libro.fecha_de_edicion)}
                  </p>
                  <p>Código: {libro.id_libro}</p>
                  {/* Botones para editar y borrar el libro */}
                  <div className='botones'>
                    <button
                      className='boton'
                      onClick={() => redirectToEdit(libro)}>
                      Editar
                    </button>
                    <button
                      className='boton'
                      onClick={() => redirectToDelete(libro)}>
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error
        )}
      </div>
    </div>
  );
}

export default BuscarLibro;
