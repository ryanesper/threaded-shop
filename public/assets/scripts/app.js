import { getProducts as getProductsService } from "./services/products.js"

document.addEventListener('DOMContentLoaded', function() {
  const myCartEl = document.querySelector(".my-cart")
  const cartOverviewEl = document.querySelector(".cart-overview")

  myCartEl.addEventListener('mouseenter', () => cartOverviewEl.style.display = 'block');
  myCartEl.addEventListener('mouseleave', () => cartOverviewEl.style.display = 'none');
  cartOverviewEl.addEventListener('mouseenter', () => cartOverviewEl.style.display = 'block');
  cartOverviewEl.addEventListener('mouseleave', () => cartOverviewEl.style.display = 'none');

  getProducts()
  Cart.populateCartOverviewBySessionCart()
});

// fetch products list
async function getProducts() {
  const res = await getProductsService()

  if(res.status === 200 && res.data.length) {
    window.products = res.data
    populateProducts(res.data)
  }
}

// populate the recently bought products
function populateProducts(products) {
  products.forEach(function(product) {
    var newItem = document.createElement("div");
    newItem.className = "item" + (product.price.old ? " item-sale" : "");
  
    var img = document.createElement("img");
    img.src = `./assets/images/products/${product.imageName}`;
  
    var descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description";
  
    var p = document.createElement("p");
    p.textContent = product.description;
  
    var priceDiv = document.createElement("div");
    priceDiv.className = "price";

    var currentPrice = document.createElement("strong");
    currentPrice.className = "current-price";
    currentPrice.textContent = "$" + product.price.current.toFixed(2);
  
    priceDiv.appendChild(currentPrice);
  
    if (product.price.old) {
      var oldPrice = document.createElement("strong");
      oldPrice.className = "old-price";
      oldPrice.textContent = "$" + product.price.old.toFixed(2);
      
      priceDiv.appendChild(document.createTextNode(" "));
      priceDiv.appendChild(oldPrice);
    }
  
    descriptionDiv.appendChild(p);
    descriptionDiv.appendChild(priceDiv);
  
    var buyButton = document.createElement("button");
    buyButton.className = "secondary-button w-100";
    buyButton.textContent = "Buy";
    buyButton.onclick = function() {
      Cart.add(product);
    };
  
    newItem.appendChild(img);
    newItem.appendChild(descriptionDiv);
    newItem.appendChild(buyButton);
  
    const recentlyBoughtItemsEl = document.querySelector(".recently-bought-items")
    recentlyBoughtItemsEl.appendChild(newItem);
  });
}