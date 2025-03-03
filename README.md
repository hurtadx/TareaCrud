# Aplicación de Gestión de Productos - TareaCrud



## Descripción

TareaCrud es una aplicación web puesta a evaluacion en mi clase de frontend II, diseñada para la gestión eficiente de inventarios de productos. Desarrollada con tecnologías web estándar (HTML, CSS, JavaScript), esta aplicación ofrece una interfaz intuitiva y atractiva para administrar productos, con funcionalidades completas de CRUD (Crear, Leer, Actualizar y Eliminar).

## Características

- **Interfaz Moderna**: Diseño responsive que se adapta a dispositivos móviles y de escritorio.
- **Modo Oscuro**: Cambia fácilmente entre tema claro y oscuro según tus preferencias.
- **Gestión Completa de Productos**:
  - Agregar nuevos productos con nombre, precio, descripción e imagen.
  - Visualizar todos los productos en una tabla ordenada.
  - Actualizar información de productos existentes.
  - Eliminar productos con confirmación de seguridad.
- **Filtrado de Productos**: Busca productos por nombre o precio.
- **Exportación a PDF**: Genera reportes en PDF de tu inventario actual.
- **Estadísticas en Tiempo Real**: Dashboard con información sobre cantidad de productos y valor total.
- **Almacenamiento Local**: Todos los datos se guardan en el localStorage del navegador.
- **Notificaciones**: Sistema de notificaciones para acciones realizadas.

## Tecnologías Utilizadas

### Frontend:

- HTML5
- CSS3 con variables personalizadas
- JavaScript (ES6+)
- Bootstrap 5.3.3
- Font Awesome 6.4.0
- Google Fonts (Poppins)

### Bibliotecas:

- jsPDF para generación de PDF.
- jspdf-autotable para tablas en PDF.

## Instalación

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/usuario/InventoryPro.git
   ```
2. **Abrir el archivo **``** en tu navegador web:**
   - Puedes usar un servidor local como Live Server de VSCode para mejor experiencia.
   - O simplemente abre el archivo directamente en tu navegador.
3. **No requiere instalación de servidor o base de datos:**
   - Toda la información se almacena en el localStorage del navegador.

## Guía de Uso

### Agregar un Nuevo Producto

1. Completa el formulario de "Añadir Producto".
2. Proporciona nombre, precio y descripción (campos obligatorios).
3. Si lo deseas, añade una URL de imagen (opcional).
4. Haz clic en el botón "Guardar Producto".
5. Verás una notificación de confirmación y el producto se añadirá a la tabla.

### Editar un Producto Existente

1. En la tabla de productos, haz clic en el icono de edición (lápiz) del producto deseado.
2. El formulario se rellenará con los datos actuales del producto.
3. Modifica los campos que desees.
4. Haz clic en "Actualizar Producto".
5. Verás una notificación de confirmación y los cambios se reflejarán en la tabla.

### Eliminar un Producto

1. En la tabla de productos, haz clic en el icono de eliminación (papelera) del producto deseado.
2. Aparecerá un diálogo de confirmación.
3. Confirma la eliminación.
4. El producto será eliminado y verás una notificación de confirmación.

### Filtrar Productos

1. Selecciona el criterio de filtrado (nombre o precio).
2. Ingresa el valor de búsqueda en el campo de texto.
3. Haz clic en el botón de búsqueda (lupa).
4. La tabla mostrará solo los productos que coincidan con tu búsqueda.
5. Para ver todos los productos nuevamente, haz clic en el botón "X" para limpiar el filtro.

### Exportar a PDF

1. Haz clic en el botón "PDF" ubicado en la esquina superior derecha de la tabla.
2. Se generará y descargará automáticamente un archivo PDF con el listado de productos.

### Cambiar entre Modo Claro y Oscuro

1. Haz clic en el botón "Modo oscuro" en la barra de navegación.
2. El tema cambiará instantáneamente.
3. La preferencia se guardará para futuras visitas.

## Almacenamiento de Datos

- Todos los datos de la aplicación se almacenan en el localStorage del navegador.
- Esto significa que:
  - La información persiste entre sesiones del navegador.
  - Los datos son exclusivos para cada dispositivo y navegador.
  - No hay información compartida entre usuarios.
  - **Al limpiar los datos del navegador, se perderán los productos guardados.**

## Limitaciones

- Al ser una aplicación basada en localStorage, tiene un límite aproximado de 5-10MB de almacenamiento.
- No hay sincronización entre dispositivos.
- Sin capacidad para almacenar imágenes localmente (solo URLs).

## Créditos

- **Iconos:** Flaticon
- **Fuentes:** Google Fonts
- **Framework CSS:** Bootstrap
- **Iconos de interfaz:** Font Awesome

