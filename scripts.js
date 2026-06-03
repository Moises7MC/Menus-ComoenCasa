  // AHORA LEE EL ARCHIVO JSON LOCAL DE NETLIFY DIRECTAMENTE
  const API_URL = 'menu.json'; 

  const iconosCategoria = {
    'Entradas': '🥗',
    'Platos de fondo': '🍽️',
    'Postres': '🍮',
    'Bebidas': '🥤',
    'Duos': '⭐'
  };

  async function cargarMenuDinamico() {
    const contenedor = document.querySelector('.menu-container');
    
    try {
      contenedor.innerHTML = '<div style="text-align: center; padding: 2rem;">Cargando menú de hoy...</div>';
      
      // Agregamos un timestamp a la URL para evitar que el celular guarde el caché viejo
      const timestamp = new Date().getTime();
      const respuesta = await fetch(`${API_URL}?t=${timestamp}`);
      
      if (!respuesta.ok) throw new Error('Error en red');
      const platos = await respuesta.json();

      if (!platos || platos.length === 0) {
        contenedor.innerHTML = '<div style="text-align: center; padding: 2rem;">El menú de hoy se publicará pronto.</div>';
        return;
      }

      const menuAgrupado = platos.reduce((acc, plato) => {
        if (!acc[plato.categoria]) acc[plato.categoria] = [];
        acc[plato.categoria].push(plato);
        return acc;
      }, {});

      contenedor.innerHTML = ''; 

      for (const [categoria, items] of Object.entries(menuAgrupado)) {
        const icono = iconosCategoria[categoria] || '🍽️';
        let sectionHTML = `
          <div class="section">
            <div class="section-header">
              <div class="section-icon">${icono}</div>
              <div class="section-title">${categoria}</div>
              <div class="section-line"></div>
            </div>
        `;

        if (categoria === 'Bebidas') {
          sectionHTML += `<div class="drinks-grid">`;
          items.forEach(item => {
            sectionHTML += `
              <div class="drink-item">
                <span class="drink-name">${item.nombre}</span>
                <span class="drink-price">S/. ${item.precio.toFixed(2)}</span>
              </div>`;
          });
          sectionHTML += `</div>`;
        } else {
          items.forEach(item => {
            const destaqueClass = item.esDestacado ? ' highlight' : '';
            const descHTML = item.descripcion ? `<div class="dish-desc">${item.descripcion}</div>` : '';
            const precioHTML = item.precio > 0 ? `<div class="dish-price">S/. ${item.precio.toFixed(2)}</div>` : '';
            
            let tagHTML = '';
            if (item.tag) {
              let tagClass = 'tag-s'; 
              if (item.tag === 'Vegetariano') tagClass = 'tag-v'; 
              if (item.tag === 'Mariscos') tagClass = 'tag-p'; 
              tagHTML = `<div class="dish-tags"><span class="tag ${tagClass}">${item.tag}</span></div>`;
            }

            sectionHTML += `
              <div class="dish${destaqueClass}">
                <div class="dish-info">
                  <div class="dish-name">${item.nombre}</div>
                  ${descHTML}
                  ${tagHTML}
                </div>
                ${precioHTML}
              </div>`;
          });
        }

        sectionHTML += `</div>`; 
        contenedor.innerHTML += sectionHTML;
      }

    } catch (error) {
      console.error('Error al cargar el menú:', error);
      contenedor.innerHTML = '<div style="text-align: center; padding: 2rem;">Menú en actualización. Actualiza la página en unos segundos.</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', cargarMenuDinamico);