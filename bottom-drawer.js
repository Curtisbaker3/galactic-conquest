
function toggleBuildMenu() {
  document.getElementById('build-menu').classList.toggle('shown');
}

const availableBuildItems = [
  ..._.range(1000).map(() => ({
    title: 'Some Purchase',
    description: 'Some brief description of the purchase.',
    cost: 30
  }))
];

function renderBuildMenuItem(buildItem) {
  return `
    <div class="bottom-drawer-shop-item">
      <div class="bottom-drawer-item-title">${ buildItem.title }</div>
      <div class="bottom-drawer-item-cost">${ formatMoney(buildItem.cost) }</div>
      <div class="bottom-drawer-item-description">${ buildItem.description }</div>
    </div>
  `;
}

function drawBuildMenu() {
  const buildMenuItemsDiv = document.getElementById('build-menu-items');
  while (buildMenuItemsDiv.firstChild) { buildMenuItemsDiv.removeChild(buildMenuItemsDiv.firstChild); }
  buildMenuItemsDiv.innerHTML = availableBuildItems.map(renderBuildMenuItem).join('');
}

drawBuildMenu();