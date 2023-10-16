import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatearFecha } from '../Utils/FormatoFecha';
import '../Styles/Style.css';

/**
 * Componente ListaDeLibros para mostrar una lista de libros.
 */
function ListaDeLibros() {
  // Estado para almacenar la lista de libros
  const [libros, setLibros] = useState([]);
  // useNavigate para la navegación programática
  const navigate = useNavigate();

  /**
   * Hook useEffect para realizar operaciones secundarias después de que el componente se monta.
   * Aquí, recuperamos la lista de libros de la API.
   */
  useEffect(() => {
    // Función asíncrona para obtener la lista de libros de la API
    const obtenerLibros = async () => {
      try {
        // Realiza una solicitud GET a la API
        const response = await axios.get(
          'http://localhost/codeigniter4/public/libros'
        );
        setLibros(response.data.libro); // Almacena la lista de libros en el estado
      } catch (error) {
        // Maneja errores y los registra en la consola
        console.error('Hubo un error al obtener los datos:', error);
      }
    };

    obtenerLibros(); // Llama a la función obtenerLibros
  }, []); // Sin dependencias, por lo que se ejecuta solo una vez

  // Función para redirigir al usuario a la página de edición para un libro específico
  const redirectToEdit = (libro) => {
    navigate(`/libros/editar/${libro.id_libro}`, { state: { libro } });
  };

  // Función para redirigir al usuario a la página de eliminación para un libro específico
  const redirectToDelete = (libro) => {
    navigate(`/libros/${libro.id_libro}`, { state: { libro } });
  };

  // Separa la lista de libros en dos columnas
  const primeraColumna = libros.filter((_, index) => index % 2 === 0);
  const segundaColumna = libros.filter((_, index) => index % 2 !== 0);

  // Renderiza la interfaz de usuario para mostrar la lista de libros
  return (
    <div className='libros-container'>
      {/* Itera sobre la primera columna de libros */}
      <div className='columna'>
        {primeraColumna.map((libro) => (
          // Crea una tarjeta para cada libro
          <div key={libro.id_libro} className='libro-card-container'>
            {/* Muestra la imagen del libro */}
            <div className='card imagen-card'>
              <img
                src={`${process.env.PUBLIC_URL}/Images/${encodeURIComponent(
                  libro.nombre
                )}.jpg`}
                alt={libro.nombre}
              />
            </div>
            {/* Muestra los detalles del libro */}
            <div className='card detalles-card'>
              <h2>{libro.nombre}</h2>
              <p>Autor: {libro.autor}</p>
              <p>Fecha de Edición: {formatearFecha(libro.fecha_de_edicion)}</p>
              <p>Código: {libro.id_libro}</p>
              {/* Botones para editar y borrar el libro */}
              <div className='botones'>
                <button className='boton' onClick={() => redirectToEdit(libro)}>
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
      {/* Itera sobre la segunda columna de libros */}
      <div className='columna'>
        {segundaColumna.map((libro) => (
          // Crea una tarjeta para cada libro
          <div key={libro.id_libro} className='libro-card-container'>
            {/* Muestra la imagen del libro */}
            <div className='card imagen-card'>
              <img
                src={`${process.env.PUBLIC_URL}/Images/${encodeURIComponent(
                  libro.nombre
                )}.jpg`}
                alt={libro.nombre}
              />
            </div>
            {/* Muestra los detalles del libro */}
            <div className='card detalles-card'>
              <h2>{libro.nombre}</h2>
              <p>Autor: {libro.autor}</p>
              <p>Fecha de Edición: {formatearFecha(libro.fecha_de_edicion)}</p>
              <p>Código: {libro.id_libro}</p>
              {/* Botones para editar y borrar el libro */}
              <div className='botones'>
                <button className='boton' onClick={() => redirectToEdit(libro)}>
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
    </div>
  );
}

export default ListaDeLibros;
