import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/StyleOpt.css';

/**
 * Componente CrearLibro que permite a los usuarios agregar un nuevo libro.
 */
function CrearLibro() {
  // Proporciona la funcionalidad de navegación
  const navigate = useNavigate();

  // Estados para manejar los datos del libro y los mensajes de error
  const [libro, setLibro] = useState({
    nombre: '',
    autor: '',
    fecha_de_edicion: '',
  });
  const [error, setError] = useState('');

  // Verifica si todos los campos necesarios están llenos
  const camposCompletos = libro.nombre && libro.autor && libro.fecha_de_edicion;

  /**
   * Maneja el evento de clic en el botón "Crear Libro".
   * Si todos los campos están completos, procede a enviar los datos.
   * Si no, establece un mensaje de error.
   */
  const handleClick = () => {
    if (!camposCompletos) {
      setError('Se necesitan que todos los datos sean ingresados'); // Mensaje de error si falta algún campo
    } else {
      handleSubmit(); // Proceder con el envío si todo está completo
    }
  };

  /**
   * Función asíncrona que maneja el envío de datos a la API.
   * Utiliza axios para realizar una solicitud POST con los datos del libro.
   */
  const handleSubmit = async () => {
    try {
      setError(''); // Reiniciar cualquier mensaje de error previo
      await axios.post('http://localhost/codeigniter4/public/libros', libro); // Envía los datos del libro a la API
      alert('Libro creado con éxito'); // Notifica al usuario que el libro se creó con éxito
      navigate('/libros'); // Redirige al usuario a la lista de libros
    } catch (error) {
      console.error('Hubo un error al crear el libro:', error); // Registra el error en la consola si la solicitud falla
      setError('Hubo un error al crear el libro.'); // Muestra un mensaje de error en la interfaz de usuario
    }
  };

  // Renderiza el formulario para crear un nuevo libro
  return (
    <div className='crear-libro-container'>
      <h1>Crear Libro</h1>
      {error && <p className='error-message'>{error}</p>}{' '}
      {/* Muestra mensajes de error si los hay */}
      <form onSubmit={(e) => e.preventDefault()} className='libro-form'>
        {/* Campos de entrada para los detalles del libro */}
        <div className='form-control'>
          <label>Nombre:</label>
          <input
            type='text'
            value={libro.nombre}
            onChange={(e) => setLibro({ ...libro, nombre: e.target.value })}
            required
          />
        </div>
        <div className='form-control'>
          <label>Autor:</label>
          <input
            type='text'
            value={libro.autor}
            onChange={(e) => setLibro({ ...libro, autor: e.target.value })}
            required
          />
        </div>
        <div className='form-control'>
          <label>Fecha de Edición:</label>
          <input
            type='date'
            value={libro.fecha_de_edicion}
            onChange={(e) =>
              setLibro({ ...libro, fecha_de_edicion: e.target.value })
            }
            required
          />
        </div>
        {/* Botón para enviar el formulario */}
        <button type='button' className='boton' onClick={handleClick}>
          Crear Libro
        </button>
      </form>
    </div>
  );
}

export default CrearLibro;
