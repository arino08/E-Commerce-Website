// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(products => {
        const productsDiv = document.getElementById('products');
        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
          productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
          `;
          productsDiv.appendChild(productDiv);
        });
      });
  });