let selectedCategories = new Set();

function renderCategories(filterText = '') {
  const container = document.getElementById('categories-list');
  if (!container) return;

  const query = filterText.toLowerCase().trim();
  container.innerHTML = '';

  categoriesData.forEach(group => {
    // Filtra os itens do grupo
    const filteredItems = group.items.filter(item => 
      item.name.toLowerCase().includes(query) || group.group.toLowerCase().includes(query)
    );

    if (filteredItems.length === 0) return;

    // Cabeçalho do Grupo
    const groupHeader = document.createElement('div');
    groupHeader.className = 'flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#1A1A1A] mb-2';
    groupHeader.innerHTML = `
      <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color: ${group.bgAlpha}; color: ${group.color}">
        <i data-lucide="${group.icon}" class="w-4 h-4"></i>
      </div>
      <span class="text-sm font-semibold text-white">${group.group}</span>
    `;
    container.appendChild(groupHeader);

    // Lista de Subcategorias
    filteredItems.forEach(item => {
      const isChecked = selectedCategories.has(item.id);
      const itemRow = document.createElement('div');
      itemRow.className = 'flex items-center justify-between py-3 px-3 hover:bg-card/50 rounded-lg transition-colors cursor-pointer';
      
      itemRow.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-card flex items-center justify-center text-gray-400">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
          </div>
          <span class="text-xs text-gray-200 font-medium">${item.name}</span>
        </div>
        <input type="checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''} class="category-checkbox" />
      `;

      // Evento de Seleção
      itemRow.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const checkbox = itemRow.querySelector('input[type="checkbox"]');
          checkbox.checked = !checkbox.checked;
          toggleCategorySelection(item.id, checkbox.checked);
        }
      });

      const checkbox = itemRow.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', (e) => {
        toggleCategorySelection(item.id, e.target.checked);
      });

      container.appendChild(itemRow);
    });
  });

  // Atualiza os ícones do Lucide após a renderização
  if (window.lucide) {
    lucide.createIcons();
  }
}

function toggleCategorySelection(categoryId, isSelected) {
  if (isSelected) {
    selectedCategories.add(categoryId);
  } else {
    selectedCategories.delete(categoryId);
  }
}

// Configura o evento do campo de busca no Modal
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#categories-modal input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCategories(e.target.value);
    });
  }
  
  // Renderização inicial
  renderCategories();
});
