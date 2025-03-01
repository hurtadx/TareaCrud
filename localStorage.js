
const d = document;
const tabla = d.querySelector("tbody");
const nombrePro = d.getElementById("nombrePro");
const precioPro = d.getElementById("precioPro");
const descripcionPro = d.getElementById("descripcionPro");
const imagenPro = d.getElementById("imagenPro");
const btnGuardad = d.querySelector(".btnGuardad");
let btnActualizar = d.querySelector(".btnActualizar");
const productoForm = d.getElementById("productoForm");
const btnFiltrar = d.getElementById("btnFiltrar");
const btnPdf = d.querySelector(".btnPdf");



productoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  
  if(nombrePro.value.trim() === '' || precioPro.value.trim() === '' || descripcionPro.value.trim() === '') {
    showNotification("Por favor, completa los campos obligatorios", "danger");
    return;
  }

  
  if(btnActualizar.classList.contains("d-none")) {
    const productoObject = {
      nombre: nombrePro.value,
      precio: precioPro.value,
      descripcion: descripcionPro.value,
      imagen: imagenPro.value || "https:
    };
    
    guardarDatos(productoObject);
    borrarTabla();
    mostrarDatos();
    limpiarFormulario();
  }
});


function limpiarFormulario() {
  nombrePro.value = "";
  precioPro.value = "";
  descripcionPro.value = "";
  imagenPro.value = "";
}

d.getElementById("btnLimpiar").addEventListener("click", () => {
  limpiarFormulario();
  
  
  if (!btnActualizar.classList.contains("d-none")) {
    btnActualizar.classList.add("d-none");
    btnGuardad.classList.remove("d-none");
    document.getElementById("form-title").textContent = "Añadir Producto";
  }
});


function mostrarDatos(productosAMostrar) {
  const productos = productosAMostrar || JSON.parse(localStorage.getItem("productos")) || [];
  
  
  if (productosAMostrar && productosAMostrar !== JSON.parse(localStorage.getItem("productos"))) {
    document.getElementById("filtroActivo").classList.remove("d-none");
  } else {
    document.getElementById("filtroActivo").classList.add("d-none");
  }
  
  
  if (productos.length === 0) {
    document.getElementById("emptyMessage").classList.remove("d-none");
    document.querySelector(".table-responsive").classList.add("d-none");
  } else {
    document.getElementById("emptyMessage").classList.add("d-none");
    document.querySelector(".table-responsive").classList.remove("d-none");
    
    productos.forEach((prod, i) => {
      const fila = d.createElement("tr");
      fila.style.animation = `fadeIn 0.3s ease forwards ${i * 0.05}s`;
      fila.style.opacity = "0";
      
      fila.innerHTML = `
        <td>${i + 1}</td>
        <td><strong>${prod.nombre}</strong></td>
        <td>$${parseFloat(prod.precio).toFixed(2)}</td>
        <td>${prod.descripcion.length > 30 ? prod.descripcion.substring(0, 30) + '...' : prod.descripcion}</td>
        <td><img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https:
        <td>
            <div class="d-flex flex-nowrap">
                <span onclick="actualizarProducto(${i})" class="btn-editar" title="Editar"><i class="fas fa-edit"></i></span>
                <span onclick="eliminarPedido(${i})" class="btn-eliminar" title="Eliminar"><i class="fas fa-trash"></i></span>
            </div>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }
  
  
  updateProductCount();
}


function borrarTabla() {
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }
}


function guardarDatos(pro) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(pro);
  localStorage.setItem("productos", JSON.stringify(productos));
  showNotification("Producto guardado con éxito", "success");
}


function eliminarPedido(pos) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const nombreProducto = productos[pos].nombre;
  
  
  const modalHtml = `
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar el producto "${nombreProducto}"?</p>
            <p class="text-muted small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmDelete">Sí, eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);
  
  
  const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
  modal.show();
  
  
  document.getElementById('confirmDelete').addEventListener('click', function() {
    productos.splice(pos, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    modal.hide();
    
    
    document.getElementById('deleteConfirmModal').addEventListener('hidden.bs.modal', function() {
      document.body.removeChild(modalContainer);
    });
    
    showNotification(`"${nombreProducto}" eliminado correctamente`, "danger");
    borrarTabla();
    mostrarDatos();
  });
  
  
  document.getElementById('deleteConfirmModal').addEventListener('hidden.bs.modal', function() {
    document.body.removeChild(modalContainer);
  });
}


function actualizarProducto(pos) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  nombrePro.value = productos[pos].nombre;
  precioPro.value = productos[pos].precio;
  descripcionPro.value = productos[pos].descripcion;
  imagenPro.value = productos[pos].imagen;
  
  document.getElementById("form-title").textContent = "Editar Producto";
  btnActualizar.classList.remove("d-none");
  btnGuardad.classList.add("d-none");
  
  
  if (window.innerWidth < 768) {
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
  }

  
  const nuevoBtn = btnActualizar.cloneNode(true);
  btnActualizar.replaceWith(nuevoBtn);
  btnActualizar = nuevoBtn;

  btnActualizar.addEventListener("click", (e) => {
    e.preventDefault();
    
    
    if(nombrePro.value.trim() === '' || precioPro.value.trim() === '' || descripcionPro.value.trim() === '') {
      showNotification("Por favor, completa los campos obligatorios", "danger");
      return;
    }
    
    
    productos[pos].nombre = nombrePro.value;
    productos[pos].precio = precioPro.value;
    productos[pos].descripcion = descripcionPro.value;
    productos[pos].imagen = imagenPro.value || productos[pos].imagen;

    localStorage.setItem("productos", JSON.stringify(productos));
    showNotification("Producto actualizado con éxito", "success");

    limpiarFormulario();
    
    document.getElementById("form-title").textContent = "Añadir Producto";
    btnActualizar.classList.add("d-none");
    btnGuardad.classList.remove("d-none");

    borrarTabla();
    mostrarDatos();
  });
}


btnFiltrar.addEventListener("click", () => {
  const filterType = document.getElementById("filterType").value;
  const filterValue = document.getElementById("filterValue").value.toLowerCase();
  
  if (filterValue.trim() === "") {
    showNotification("Ingresa un valor para filtrar", "warning");
    return;
  }
  
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  
  const productosFiltrados = productos.filter(producto => {
    if (filterType === "nombre") {
      return producto.nombre.toLowerCase().includes(filterValue);
    } else if (filterType === "precio") {
      return producto.precio.toString() === filterValue;
    }
    return false;
  });
  
  borrarTabla();
  
  if (productosFiltrados.length === 0) {
    showNotification("No se encontraron productos con ese filtro", "info");
    mostrarDatos(productos);
  } else {
    mostrarDatos(productosFiltrados);
  }
});


document.getElementById("btnLimpiarFiltro").addEventListener("click", () => {
  document.getElementById("filterValue").value = "";
  document.getElementById("filtroActivo").classList.add("d-none");
  borrarTabla();
  mostrarDatos();
});


function updateProductCount() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const countElement = document.getElementById("productCount");
  
  if (productos.length === 0) {
    countElement.textContent = "No hay productos";
  } else if (productos.length === 1) {
    countElement.textContent = "1 producto";
  } else {
    countElement.textContent = `${productos.length} productos`;
  }
}


function showNotification(message, type = 'success') {
  
  const notification = document.createElement('div');
  notification.className = `toast align-items-center text-white bg-${type} border-0 show position-fixed top-0 end-0 m-3`;
  notification.style.zIndex = "1050";
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'assertive');
  notification.setAttribute('aria-atomic', 'true');
  notification.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fas ${getIconForType(type)} me-2"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}


function getIconForType(type) {
  switch(type) {
    case 'success': return 'fa-check-circle';
    case 'danger': return 'fa-times-circle';
    case 'warning': return 'fa-exclamation-triangle';
    case 'info': return 'fa-info-circle';
    default: return 'fa-bell';
  }
}


btnPdf.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  
  doc.setFontSize(18);
  doc.text("Listado de Productos", 105, 15, { align: "center" });
  doc.setLineWidth(0.5);
  doc.line(20, 20, 190, 20);
  
  
  doc.setFontSize(11);
  doc.setTextColor(100);
  
  const headers = ["#", "Nombre", "Precio", "Descripción"];
  const data = [];
  
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  
  productos.forEach((producto, index) => {
    data.push([
      index + 1,
      producto.nombre,
      `$${parseFloat(producto.precio).toFixed(2)}`,
      producto.descripcion.length > 30 ? producto.descripcion.substring(0, 30) + '...' : producto.descripcion
    ]);
  });
  
  
  if (productos.length === 0) {
    doc.setTextColor(100);
    doc.text("No hay productos para mostrar", 105, 40, { align: "center" });
  } else {
    
    const startY = 30;
    doc.autoTable({
      head: [headers],
      body: data,
      startY: startY,
      theme: 'striped',
      headStyles: { 
        fillColor: [108, 99, 255],
        textColor: 255
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 60 },
        2: { cellWidth: 30 },
        3: { cellWidth: 80 }
      },
      styles: {
        overflow: 'ellipsize',
        cellPadding: 3
      }
    });
    
    
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Página ${i} de ${pageCount} - Generado el ${new Date().toLocaleDateString()}`, 105, doc.internal.pageSize.height - 10, { align: "center" });
    }
  }
  
  
  doc.save("productos.pdf");
  showNotification("PDF generado exitosamente", "success");
});


document.addEventListener("DOMContentLoaded", () => {
  
  const bootstrapScript = document.createElement('script');
  bootstrapScript.src = 'https:
  document.body.appendChild(bootstrapScript);
  
  
  borrarTabla();
  mostrarDatos();
});


document.getElementById("btnLimpiarFiltro").addEventListener("click", () => {
  document.getElementById("filterValue").value = "";
  document.getElementById("filtroActivo").classList.add("d-none");
  borrarTabla();
  mostrarDatos();
});


document.getElementById("btnLimpiar").addEventListener("click", () => {
  nombrePro.value = "";
  precioPro.value = "";
  descripcionPro.value = "";
  imagenPro.value = "";
  
  if (!btnActualizar.classList.contains("d-none")) {
    btnActualizar.classList.add("d-none");
    btnGuardad.classList.remove("d-none");
    document.getElementById("form-title").textContent = "Añadir Producto";
  }
});



function mostrarDatos(productosAMostrar) {
  const productos = productosAMostrar || JSON.parse(localStorage.getItem("productos")) || [];
  
  if (productosAMostrar && productosAMostrar.length > 0) {
    document.getElementById("filtroActivo").classList.remove("d-none");
  } else {
    document.getElementById("filtroActivo").classList.add("d-none");
  }
  
  productos.forEach((prod, i) => {
    const fila = d.createElement("tr");
    fila.style.animation = `fadeIn 0.3s ease forwards ${i * 0.1}s`;
    fila.style.opacity = "0";
    
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td><strong>${prod.nombre}</strong></td>
      <td>$${prod.precio}</td>
      <td>${prod.descripcion.length > 50 ? prod.descripcion.substring(0, 50) + '...' : prod.descripcion}</td>
      <td>
          <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https:
      </td>
      <td>
          <span onclick="actualizarProducto(${i})" class="btn btn-editar" title="Editar"> ✏️ </span>
          <span onclick="eliminarPedido(${i})" class="btn btn-eliminar" title="Eliminar"> ✖️ </span>
      </td>
    `;
    tabla.appendChild(fila);
  });
  
  
  updateProductCount();
}


function guardarDatos(pro) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(pro);
  localStorage.setItem("productos", JSON.stringify(productos));
  showNotification("Producto guardado con éxito", "success");
}


function eliminarPedido(pos) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const nombreProducto = productos[pos].nombre;
  
  if (confirm(`¿Estás seguro de que deseas eliminar "${nombreProducto}"?`)) {
    productos.splice(pos, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    showNotification(`"${nombreProducto}" eliminado correctamente`, "danger");
    borrarTabla();
    mostrarDatos();
  }
}


function actualizarProducto(pos) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  nombrePro.value = productos[pos].nombre;
  precioPro.value = productos[pos].precio;
  descripcionPro.value = productos[pos].descripcion;
  imagenPro.value = productos[pos].imagen;
  
  document.getElementById("form-title").textContent = "Editar Producto";
  btnActualizar.classList.remove("d-none");
  btnGuardad.classList.add("d-none");
  
  
  if (window.innerWidth < 768) {
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
  }

  const nuevoBtn = btnActualizar.cloneNode(true);
  btnActualizar.replaceWith(nuevoBtn);
  btnActualizar = nuevoBtn;

  btnActualizar.addEventListener("click", (e) => {
    e.preventDefault();
    productos[pos].nombre = nombrePro.value;
    productos[pos].precio = precioPro.value;
    productos[pos].descripcion = descripcionPro.value;
    productos[pos].imagen = imagenPro.value;

    localStorage.setItem("productos", JSON.stringify(productos));
    showNotification("Producto actualizado con éxito", "success");

    nombrePro.value = "";
    precioPro.value = "";
    descripcionPro.value = "";
    imagenPro.value = "";
    
    document.getElementById("form-title").textContent = "Añadir Producto";
    btnActualizar.classList.add("d-none");
    btnGuardad.classList.remove("d-none");

    borrarTabla();
    mostrarDatos();
  });
}


document.addEventListener("DOMContentLoaded", () => {
  borrarTabla();
  mostrarDatos();
  updateProductCount();
});