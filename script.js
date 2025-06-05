document.addEventListener('DOMContentLoaded', () => {
    fetch('product.json')
    .then(response => response.json())
    .then(data => renderProducts(data))
    .catch(error => console.error('Error fetching products:', error));
});

function renderProducts(products){
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
        <div class = "main-products-one">
        <div class = "product-image">
        <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="description">
        <h3>${product.name}</h3>
        ${product.discount ? `<p class="discount">${product.discount}</p>` : ''}
        <div class="details">
        <p class="mrp">${product.mrp}</p>
        ${product.price ? `<p class="price">${product.price}</p>` : ''}
        </div>
        </div>
        </div>
        `;
        container.insertAdjacentHTML('beforeend', productHTML)
    })
}