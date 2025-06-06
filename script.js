let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  const stockFilter = document.getElementById("stockFilter");
  const tabletFilter = document.getElementById("tabletFilter");
  const accessoryFilter = document.getElementById("accessoryFilter");
  const productContainer = document.getElementById("productContainer");
  const rankSelect = document.getElementById("rankSelect");

  fetch('product.json')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      applyFiltersAndSort();
    })
    .catch(error => console.error('Error fetching products:', error));

  function getNumeric(val) {
    if (!val) return 0;
    return parseFloat(val.toString().replace(/[^0-9.]/g, ""));
  }

  function renderProducts(products) {
    productContainer.innerHTML = '';

    if (products.length === 0) {
      productContainer.innerHTML = '<p>No products found.</p>';
      return;
    }

    products.forEach(product => {
      const productHTML = `
        <div class="main-products-one">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="description">
            <h3>${product.name}</h3>
            ${product.discount ? `<p class="discount">${product.discount}</p>` : ''}
            <div class="details">
              <p class="mrp">₹${product.mrp}</p>
              ${product.price ? `<p class="price">₹${product.price}</p>` : ''}
            </div>
          </div>
        </div>
      `;
      productContainer.insertAdjacentHTML('beforeend', productHTML);
    });
  }

  function applyFiltersAndSort() {
    const showStock = stockFilter.checked;
    const showTablet = tabletFilter.checked;
    const showAccessories = accessoryFilter.checked;

    let filtered = allProducts.filter(product => {
      const matchStock = !showStock || product.stock === true;

      let matchCategory = true;
      if (showTablet || showAccessories) {
        const category = product.category.toLowerCase();
        matchCategory =
          (showTablet && category === "tablet") ||
          (showAccessories && category === "accessories");
      }

      return matchStock && matchCategory;
    });

    const value = rankSelect.value;

    if (value === "low-to-high") {
      filtered.sort((a, b) => getNumeric(a.mrp) - getNumeric(b.mrp));
    } else if (value === "high-to-low") {
      filtered.sort((a, b) => getNumeric(b.mrp) - getNumeric(a.mrp));
    } else if (value === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderProducts(filtered);
  }

  stockFilter.addEventListener("change", applyFiltersAndSort);
  tabletFilter.addEventListener("change", applyFiltersAndSort);
  accessoryFilter.addEventListener("change", applyFiltersAndSort);
  rankSelect.addEventListener("change", applyFiltersAndSort);
});

document.querySelectorAll('.footer-header').forEach(header => {
    header.addEventListener('click', () => {
      const list = header.nextElementSibling;
      const plus = header.querySelector('.plus-icon');
      const isOpen = list.style.display === 'block';

      list.style.display = isOpen ? 'none' : 'block';

      plus.textContent = isOpen ? '+' : '–';
    });
  });