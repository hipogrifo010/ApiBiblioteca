import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/StyleOpt.css';

/**
 * Componente EditarLibro que permite a los usuarios editar un libro existente.
 */
function EditarLibro() {
  // Hook useParams para acceder al parámetro ID de la URL
  const { id } = useParams();
  // Hook useNavigate para la redirección programática
  const navigate = useNavigate();
  // Estado para manejar la información del libro
  const [libro, setLibro] = useState(null);

  /**
   * Hook useEffect que se ejecuta después de que el componente se monta.
   * Aquí, recuperamos los datos del libro de la API.
   */
  useEffect(() => {
    // Función para recuperar los datos del libro de la API
    const fetchLibro = async () => {
      try {
        // Solicitar los datos del libro a la API
        const respuesta = await axios.get(
          `http://localhost/codeigniter4/public/libros/${id}`
        );
        setLibro(respuesta.data); // Establecer los datos del libro en el estado
      } catch (error) {
        console.error('Error al recuperar los datos del libro:', error); // Log de error en consola si hay un fallo
      }
    };

    fetchLibro(); // Llamar a la función fetchLibro
  }, [id]); // Dependencia de useEffect, se ejecutará nuevamente si 'id' cambia

  /**
   * Manejar el envío del formulario.
   * Esta función se activará cuando el usuario envíe el formulario de edición.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir la recarga de la página debido al envío del formulario
    const { id_libro, ...libroSinId } = libro; // Extraer 'id_libro' y formar un nuevo objeto sin 'id'

    try {
      // Enviar una solicitud PUT para actualizar el libro en la API
      await axios.put(
        `http://localhost/codeigniter4/public/libros/${id}`,
        libroSinId // enviando los datos del libro sin el 'id'
      );
      alert('Libro actualizado con éxito'); // Alertar al usuario sobre el éxito de la operación
      navigate('/libros'); // Redirigir al usuario a la página de lista de libros
    } catch (error) {
      console.error('Hubo un error al actualizar el libro:', libroSinId); // Log de error en consola si hay un fallo
    }
  };

  // Si 'libro' es null (aún no se han cargado los datos), muestra un mensaje de carga
  if (!libro) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  // Renderizar la UI del formulario de edición de libro
  return (
    <div className='main-container'>
      <div className='outer-container'>
        {' '}
        {/* Contenedor adicional */}
        <div className='editar-libro-container'>
          <h1>Editar Libro</h1>
          <form onSubmit={handleSubmit} className='libro-form'>
            {/* Campos de entrada para editar los detalles del libro */}
            <div className='form-control'>
              <label>Nombre:</label>
              <input
                type='text'
                value={libro.nombre}
                onChange={(e) => setLibro({ ...libro, nombre: e.target.value })}
              />
            </div>
            <div className='form-control'>
              <label>Autor:</label>
              <input
                type='text'
                value={libro.autor}
                onChange={(e) => setLibro({ ...libro, autor: e.target.value })}
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
              />
            </div>
            {/* Botón para enviar el formulario */}
            <button type='submit' className='boton'>
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Exporta EditarLibro para su uso en otras partes de la aplicación
export default EditarLibro;
