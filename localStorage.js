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
    const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADy0lEQVR4nO3cT2hcVRTH8e+ZNBWkKrTWP6miqzQudCEUXbQ7KYL/NlWxuhUEXbhrV5Fu3Lj1H7gQREFdNKigQrqxgqigbhqwKAi1Cik0IYm0zeRaJpoxJPPm3nPfzDsf+O2S+zvn3Ttz582bEBERERERERGRKrPQBSyWma0ArgNuAK4FrgbWApcXP3PAWeA0MAl8D0yY2R8h6g0taoOY2UrgLuB+YBuwMXGIU8ABYMzMfnBUXjSiaxAzWwE8CDwJbPIU9hDwupnt9xQvqGgaxMw2A28BW0qKOAo8aWaflyR/YcEbxMyuAt4D1pccdRT4n6xvlpw3l2D7EDNbA3xMmHPDeuAjM7sqQO7cgjSImW0gs4F7ApdyPfBOcRUSvSANYmZXAJ8CGwOXMm87sMvMQk82cwl15u8Hbg1Uw1JeMLOtoYtYSu43qJntAh6LqaYm77iwM/fgVefz2zezR4DXcmcltAs4HLqIxXJdQczsduAAsD5HRpPngC+BH4vHb8DPZD+srgQ2Aw8BDwArPdeyiDHgfgtxz+USvDdI8UM29NXUaeAF4C0zO9csyMzWkXVx3gBGPNfVwlEzu8VngA9+G8TMTOG29h4ws91nisNm9iswZmZvAk+TXcmWxSXAXr8hPvj+DIn9HvFh4FFzsjA1s73AXmCdg7hmnq5Kk3i9gjCzO4Gn/FUT3BYz2+F78rLN6BKu3mJ3NYi3K4iZrSXb7FQlL5rZRp8Teu7yIeC7o1Xi6hLP1xV3d28qoj/MbK/PCb1eQcxsG3CPz/kitmHY04Telpxm9gmHZ0FVfPNl9HoP8ISvvAjd6Wsi32v5jZ7mCc21O70l8rq8MAMTT98J2SVuKLf0lsgaxL+VvgYxs2GkjL8Dq+dlG8S/S30N4mfbK1fdIJ398fenr0H8+93XIGa2CRlsfQ3i37CvQRxdHW/pM5GvBjkDnPA0V+xO+ZrI11nzY51FKVX2fPcPfd7ufQ0ytijrSnHc10S+GuRI55eUxkQpiXz+prsInPS1zh+Qw74m8tIgRUf3uI+5ImY+FwaU57PEj52MfuE575vP14Mys2+BD33OF5kjZrbP56PDvjuDXvY8XyxO+flPrCd+/qzA3oE+h/MqG3bdIGZ2AHjHSz1xeSb4w2fM7AlgzEVFcXmqKg2ym+wfN6piF3CyCg3yA/BIlP8V4s4JM3ukEg0CYGafAS+HrsOTl83s89BFuBTys3K2m1lZX5DmwxFg2Mxq8XcqQa8gAGZ2Fvgr2O3kfM4D75vZDt+flaUQvEEAij/luJfsz9T+Bl1Me+eAfcAWM3vYzE4ErEdERERERERERCQW/wH8xKbDQHj+aQAAAABJRU5ErkJggg==';
    const productoObject = {
      nombre: nombrePro.value,
      precio: precioPro.value,
      descripcion: descripcionPro.value,
      imagen: imagenPro.value || defaultImage
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
  
  
  const filtroActivo = document.getElementById("filtroActivo");
  if (filtroActivo) {
    if (productosAMostrar && productosAMostrar !== JSON.parse(localStorage.getItem("productos"))) {
      filtroActivo.classList.remove("d-none");
    } else {
      filtroActivo.classList.add("d-none");
    }
  }
  
  
  const emptyMessage = document.getElementById("emptyMessage");
  const tableResponsive = document.querySelector(".table-responsive");
  
  
  borrarTabla();
  
  if (productos.length === 0) {
    if (emptyMessage) emptyMessage.classList.remove("d-none");
    if (tableResponsive) tableResponsive.classList.add("d-none");
  } else {
    if (emptyMessage) emptyMessage.classList.add("d-none");
    if (tableResponsive) tableResponsive.classList.remove("d-none");
    
    
    const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADy0lEQVR4nO3cT2hcVRTH8e+ZNBWkKrTWP6miqzQudCEUXbQ7KYL/NlWxuhUEXbhrV5Fu3Lj1H7gQREFdNKigQrqxgqigbhqwKAi1Cik0IYm0zeRaJpoxJPPm3nPfzDsf+O2S+zvn3Ttz582bEBERERERERGRKrPQBSyWma0ArgNuAK4FrgbWApcXP3PAWeA0MAl8D0yY2R8h6g0taoOY2UrgLuB+YBuwMXGIU8ABYMzMfnBUXjSiaxAzWwE8CDwJbPIU9hDwupnt9xQvqGgaxMw2A28BW0qKOAo8aWaflyR/YcEbxMyuAt4D1pccdRT4n6xvlpw3l2D7EDNbA3xMmHPDeuAjM7sqQO7cgjSImW0gs4F7ApdyPfBOcRUSvSANYmZXAJ8CGwOXMm87sMvMQk82cwl15u8Hbg1Uw1JeMLOtoYtYSu43qJntAh6LqaYm77iwM/fgVefz2zezR4DXcmcltAs4HLqIxXJdQczsduAAsD5HRpPngC+BH4vHb8DPZD+srgQ2Aw8BDwArPdeyiDHgfgtxz+USvDdI8UM29NXUaeAF4C0zO9csyMzWkXVx3gBGPNfVwlEzu8VngA9+G8TMTOG29h4ws91nisNm9iswZmZvAk+TXcmWxSXAXr8hPvj+DIn9HvFh4FFzsjA1s73AXmCdg7hmnq5Kk3i9gjCzO4Gn/FUT3BYz2+F78rLN6BKu3mJ3NYi3K4iZrSXb7FQlL5rZRp8Teu7yIeC7o1Xi6hLP1xV3d28qoj/MbK/PCb1eQcxsG3CPz/kitmHY04Telpxm9gmHZ0FVfPNl9HoP8ISvvAjd6Wsi32v5jZ7mCc21O70l8rq8MAMTT98J2SVuKLf0lsgaxL+VvgYxs2GkjL8Dq+dlG8S/S30N4mfbK1fdIJ398fenr0H8+93XIGa2CRlsfQ3i37CvQRxdHW/pM5GvBjkDnPA0V+xO+ZrI11nzY51FKVX2fPcPfd7ufQ0ytijrSnHc10S+GuRI55eUxkQpiXz+prsInPS1zh+Qw74m8tIgRUf3uI+5ImY+FwaU57PEj52MfuE575vP14Mys2+BD33OF5kjZrbP56PDvjuDXvY8XyxO+flPrCd+/qzA3oE+h/MqG3bdIGZ2AHjHSz1xeSb4w2fM7AlgzEVFcXmqKg2ym+wfN6piF3CyCg3yA/BIlP8V4s4JM3ukEg0CYGafAS+HrsOTl83s89BFuBTys3K2m1lZX5DmwxFg2Mxq8XcqQa8gAGZ2Fvgr2O3kfM4D75vZDt+flaUQvEEAij/luJfsz9T+Bl1Me+eAfcAWM3vYzE4ErEdERERERERERCQW/wH8xKbDQHj+aQAAAABJRU5ErkJggg==';
    
    productos.forEach((prod, i) => {
      const fila = d.createElement("tr");
      fila.style.animation = `fadeIn 0.3s ease forwards ${i * 0.05}s`;
      fila.style.opacity = "0";
      
      fila.innerHTML = `
        <td>${i + 1}</td>
        <td><strong>${prod.nombre}</strong></td>
        <td>$${parseFloat(prod.precio).toFixed(2)}</td>
        <td>${prod.descripcion.length > 30 ? prod.descripcion.substring(0, 30) + '...' : prod.descripcion}</td>
        <td><img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='${defaultImage}'" class="img-thumbnail" style="max-width: 60px; max-height: 60px;"></td>
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
  
  
  updateAllStats();
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

  
  btnActualizar.removeEventListener("click", handleActualizarClick);
  
  
  const nuevoBtn = btnActualizar.cloneNode(true);
  btnActualizar.replaceWith(nuevoBtn);
  btnActualizar = nuevoBtn;

  
  btnActualizar.addEventListener("click", handleActualizarClick);
  
  
  btnActualizar.setAttribute('data-pos', pos);
}

function handleActualizarClick(e) {
  e.preventDefault();
  
  
  const pos = parseInt(btnActualizar.getAttribute('data-pos'));
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  
  
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
  updateAllStats();
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
  try {
    
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
  } catch (error) {
    console.error("Error al generar PDF:", error);
    showNotification("Error al generar PDF. Verifica la consola para más detalles.", "danger");
  }
});


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM cargado completamente");
  
  
  applyStoredTheme();
  
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleTheme();
    });
  }
  
  
  if (!window.bootstrap) {
    console.log("Cargando Bootstrap...");
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.onload = function() {
      console.log("Bootstrap cargado");
      initializeApp();
    };
    document.body.appendChild(bootstrapScript);
  } else {
    initializeApp();
  }
});

function initializeApp() {
  console.log("Inicializando aplicación");
  
  borrarTabla();
  mostrarDatos();
  
  
  if (window.bootstrap && window.bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  
  const addFirstProductBtn = document.getElementById('addFirstProduct');
  if (addFirstProductBtn) {
    addFirstProductBtn.addEventListener('click', function() {
      const formElement = document.getElementById('nombrePro');
      if (formElement) {
        formElement.focus();
      }
    });
  }
  
  console.log("Aplicación inicializada");
}


function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  
  
  body.classList.add('theme-transition');
  
  
  const isDarkTheme = body.classList.toggle('dark-theme');
  
  
  if (isDarkTheme) {
    themeToggle.innerHTML = '<i class="fas fa-sun me-1"></i> Modo claro';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon me-1"></i> Modo oscuro';
  }
  
  
  localStorage.setItem('darkTheme', isDarkTheme);
  
  
  showNotification(`Modo ${isDarkTheme ? 'oscuro' : 'claro'} activado`, 'info');
  
  
  setTimeout(() => {
    body.classList.remove('theme-transition');
  }, 300);
}


function applyStoredTheme() {
  const savedTheme = localStorage.getItem('darkTheme') === 'true';
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    if (savedTheme) {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun me-1"></i> Modo claro';
    } else {
      document.body.classList.remove('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon me-1"></i> Modo oscuro';
    }
  }
}


function updateAllStats() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  
  
  const productCount = document.getElementById("productCount");
  const headerProductCount = document.getElementById("headerProductCount");
  const dashboardProductCount = document.getElementById("dashboardProductCount");
  
  
  if (productos.length === 0) {
    productCount.textContent = "No hay productos";
  } else if (productos.length === 1) {
    productCount.textContent = "1 producto";
  } else {
    productCount.textContent = `${productos.length} productos`;
  }
  
  
  if (headerProductCount) headerProductCount.textContent = productos.length;
  if (dashboardProductCount) dashboardProductCount.textContent = productos.length;
  
  
  if (productos.length > 0) {
    const totalValue = productos.reduce((sum, producto) => {
      return sum + parseFloat(producto.precio || 0);
    }, 0);
    
    const dashboardTotalValue = document.getElementById("dashboardTotalValue");
    if (dashboardTotalValue) {
      dashboardTotalValue.textContent = `$${totalValue.toFixed(2)}`;
    }
  }
  
  
  const dashboardLastUpdate = document.getElementById("dashboardLastUpdate");
  if (dashboardLastUpdate) {
    const now = new Date();
    dashboardLastUpdate.textContent = now.toLocaleDateString();
  }
  
  
  const emptyMessage = document.getElementById("emptyMessage");
  const tableResponsive = document.querySelector(".table-responsive");
  
  if (productos.length === 0) {
    if (emptyMessage) emptyMessage.classList.remove("d-none");
    if (tableResponsive) tableResponsive.classList.add("d-none");
  } else {
    if (emptyMessage) emptyMessage.classList.add("d-none");
    if (tableResponsive) tableResponsive.classList.remove("d-none");
  }
}