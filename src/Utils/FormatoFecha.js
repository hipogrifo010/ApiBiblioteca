/**
 * Función `formatearFecha` para convertir una cadena de fecha en un formato específico.
 *
 * @param {string} fechaString - La fecha como una cadena en formato ISO (por ejemplo, '2023-10-05T14:48:00.000Z').
 * @returns {string} La fecha formateada en el formato 'DD-MM-AAAA'.
 */
export const formatearFecha = (fechaString) => {
  // Crea un objeto Date a partir de la cadena de fecha entrante.
  const fecha = new Date(fechaString);

  // Obtiene el día de la fecha y lo formatea para asegurarse de que siempre tenga dos dígitos.
  // El método 'slice(-2)' se utiliza para tomar los últimos 2 caracteres de la cadena, lo que garantiza que el día tenga el formato de dos dígitos, por ejemplo, '02' en lugar de solo '2'.
  const dia = ('0' + fecha.getDate()).slice(-2); // Agrega un cero al principio si el día tiene un solo dígito.

  // Obtiene el mes de la fecha (0-11), por lo que se suma 1 para ajustarlo al calendario estándar (1-12).
  // Se formatea el mes para asegurarse de que siempre tenga dos dígitos.
  const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Agrega un cero al principio si el mes tiene un solo dígito.

  // Obtiene el año de la fecha.
  const ano = fecha.getFullYear();

  // Construye y devuelve la fecha formateada en el formato 'DD-MM-AAAA'.
  return `${dia}-${mes}-${ano}`;
};
