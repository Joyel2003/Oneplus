let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    const stockFilter = document.getElementById("stockFilter");
    const tabletFilter = document.getElementById("tabletFilter");
    const accessoryFilter = document.getElementById("accessoryFilter");
    const productContainer = document.getElementById("productContainer");

    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            renderProducts(allProducts);
        })
        .catch(error => console.error('Error fetching products:', error));

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

    function filterProducts() {
        const showStock = stockFilter.checked;
        const showTablet = tabletFilter.checked;
        const showAccessories = accessoryFilter.checked;

        const filtered = allProducts.filter(product => {
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

        renderProducts(filtered);
    }

    stockFilter.addEventListener("change", filterProducts);
    tabletFilter.addEventListener("change", filterProducts);
    accessoryFilter.addEventListener("change", filterProducts);
});



