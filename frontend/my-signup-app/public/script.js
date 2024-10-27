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
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});
