import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/StyleOpt.css';

/**
 * Componente BorrarLibro que permite a los usuarios eliminar un libro específico.
 */
function BorrarLibro() {
  // Extrae el ID del libro de la URL
  const { id } = useParams();

  // Permite acceder al objeto de ubicación que representa el estado actual de la ruta
  const location = useLocation();

  // Proporciona la funcionalidad de navegación
  const navigate = useNavigate();

  // Intenta recuperar los detalles del libro desde el estado de la navegación
  const libro = location.state?.libro;

  // En caso de que no haya un libro especificado, redirige al usuario a la lista de libros
  if (!libro) {
    navigate('/libros');
    return null; // No renderiza ningún contenido
  }

  /**
   * Función confirmarBorrado que gestiona la eliminación del libro.
   * Realiza una petición DELETE a la API y maneja las respuestas o errores correspondientes.
   */
  const confirmarBorrado = async () => {
    try {
      // Realiza una petición DELETE a la API para eliminar el libro
      const response = await axios.delete(
        `http://localhost/codeigniter4/public/libros/${id}`
      );

      // Si la petición es exitosa, informa al usuario y redirige a la lista de libros
      if (response.status === 200) {
        alert('Libro eliminado con éxito.');
        navigate('/libros');
      }
    } catch (error) {
      // Manejo de errores específicos dependiendo de la respuesta de la API
      if (error.response && error.response.status === 404) {
        console.error('El libro no existe.');
        alert('El libro no existe.');
      } else if (error.response && error.response.status === 500) {
        console.error('Error del servidor al intentar eliminar el libro.');
        alert('Error del servidor al intentar eliminar el libro.');
      } else {
        console.error('Error al realizar la solicitud DELETE:', error);
        alert('Error al realizar la solicitud DELETE.');
      }
    }
  };

  // Renderiza la interfaz de usuario para la confirmación de eliminación del libro
  return (
    <div className='card'>
      <h1>Borrar libro</h1>
      <p>¿Estás seguro de que quieres borrar el libro "{libro.nombre}"?</p>
      <button onClick={confirmarBorrado}>Confirmar borrado</button>
    </div>
  );
}

// Exporta BorrarLibro como un módulo para ser utilizado en otras partes de la aplicación
export default BorrarLibro;
