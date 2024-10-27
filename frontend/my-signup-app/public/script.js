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
  // function logout() {
  //       fetch('/logout', {
  //           method: 'POST'
  //       })
  //       .then(response => response.text())
  //       .then(data => {
  //           alert(data);
  //           window.location.href = '/login';
  //       })
  //       .catch(error => {
  //           console.error('Error logging out:', error);
  //       });
  //   }


//   function logout() {
//     fetch('/logout', {
//         method: 'POST'
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert(data);
//         window.location.href = '/login';
//     })
//     .catch(error => {
//         console.error('Error logging out:', error);
//     });
// }

// // Check login status and update buttons
// fetch('/status')
//     .then(response => response.json())
//     .then(data => {
//         if (data.loggedIn) {
//             document.getElementById('login-button').style.display = 'none';
//             document.getElementById('logout-button').style.display = 'inline-block';
//         } else {
//             document.getElementById('login-button').style.display = 'inline-block';
//             document.getElementById('logout-button').style.display = 'none';
//         }
//     })
//     .catch(error => {
//         console.error('Error checking login status:', error);
//     });