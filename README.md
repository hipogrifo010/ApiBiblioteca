# Aplicación Librería

## Tabla de Contenidos
- [Introducción](#introducción)
- [Características](#características)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
  - [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
  - [Interfaz Gráfica](#interfaz-gráfica)
- [Uso](#uso)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Introducción

`Librería` es una aplicación web diseñada para la gestión eficiente de libros utilizando operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Esta aplicación está construida con CodeIgniter 4, aprovecha el servidor web Apache y utiliza MariaDB para la gestión de la base de datos. Una interfaz gráfica opcional, desarrollada en ReactJS, también está disponible para una interacción más intuitiva con la aplicación.

## Características

- **Operaciones CRUD**: Gestión integral de la información de libros.
- **Búsqueda Avanzada**: Filtros por nombre, autor o código del libro.
- **Diseño Optimizado de BD**: Estructura lógica y escalable con convenciones de nombres claras.
- **Interfaz Gráfica ReactJS**: (Opcional) Para una experiencia de usuario mejorada.

## Prerrequisitos

Antes de comenzar, asegúrese de cumplir con los siguientes requisitos:

- `PHP versión 8.x`
- `Servidor Apache`
- `MariaDB 10.x`
- `CodeIgniter 4`
- `Node.js y npm` (Para la interfaz gráfica en ReactJS)

## Instalación

### Configuración de la Base de Datos

Siga los pasos para configurar la base de datos:

1. Instale MariaDB y configúrelo con Laragon.
2. Clone el repositorio en la ruta base de Laragon (`www`).
3. Configure las credenciales de su DB en `app/config/Database.php`.
4. Ejecute las migraciones y cargue los datos iniciales.

### Interfaz Gráfica

Si opta por usar ReactJS:

1. Navegue al directorio de React.
2. Instale las dependencias con `npm install`.
3. Inicie la aplicación con `npm start`.

## Uso

Descripción detallada de los endpoints y operaciones disponibles, incluyendo ejemplos de cómo realizar solicitudes a la API y utilizar la interfaz gráfica.


## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## Contacto

Nombre de Contacto - (darioubramirez@gmail.com) - email

Enlace del Proyecto: [https://github.com/hipogrifo010/ApiBiblioteca](https://github.com/your_username/repo_name)
