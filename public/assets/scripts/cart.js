const Cart = (() => {
  // adds a new item in overview or update the item quantity if already exists
  const add = (product, qtyToAdd = 1) => {
    let myCart = JSON.parse(sessionStorage.getItem('cart'))

    if(!myCart) {
      myCart = []
    }

    const cartProduct = myCart.findIndex(mc => mc.id === product.id)
    if(cartProduct >= 0) {
      myCart[cartProduct].quantity += qtyToAdd
      updateCartOverviewItem(product.id)
    } else {
      product.quantity = 1
      myCart.push(product)
      addCartOverviewItem(product)
    }

    sessionStorage.setItem('cart', JSON.stringify(myCart));
    updateCartOverviewTotalQuantity()
    updateCartOverviewTotalPrice()
  }

  // adds a new item in cart overview
  const addCartOverviewItem = (product) => {
    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.id = product.id

    const itemDetails = document.createElement("div");
    itemDetails.className = "item-details";

    const img = document.createElement("img");
    img.src = `./assets/images/products/${product.imageName}`;
    img.alt = "";
    img.style.width = "100px";

    const description = document.createElement("div");
    description.className = product.description;

    const strong1 = document.createElement("strong");
    strong1.textContent = product.name;

    const p1 = document.createElement("p");
    p1.textContent = product.brand;

    const br = document.createElement("br");

    const p2 = document.createElement("p");
    p2.textContent = `Size: ${product.size}`;

    const p3 = document.createElement("p");
    p3.textContent = `Color: ${product.color}`;

    const qtySpan = document.createElement("span");
    qtySpan.className = "qty";
    qtySpan.textContent = product.quantity;
    
    const p4 = document.createElement("p");
    p4.textContent = "Qty: ";
    p4.appendChild(qtySpan);

    const strong2 = document.createElement("strong");
    strong2.textContent = product.price.current;

    description.appendChild(strong1);
    description.appendChild(p1);
    description.appendChild(br);
    description.appendChild(p2);
    description.appendChild(p3);
    description.appendChild(p4);
    description.appendChild(strong2);

    itemDetails.appendChild(img);
    itemDetails.appendChild(description);

    newItem.appendChild(itemDetails);

    const cartOverview = document.querySelector(".cart-overview .items");

    cartOverview.insertBefore(newItem, cartOverview.firstChild);
  }

  // adds a single quantity to an item in cart overview
  const updateCartOverviewItem = (id, qtyToAdd = 1) => {
    const itemQtyEl = document.querySelector(`.cart-overview .item[id='${id}'] .qty`)

    itemQtyEl.textContent = parseInt(itemQtyEl.textContent) + qtyToAdd
  }

  // updates the my bag total quantity in cart overview 
  const updateCartOverviewTotalQuantity = () => {
    document.querySelector(".cart-overview .total-qty").textContent = JSON.parse(sessionStorage.getItem('cart')).map(c => c.quantity).reduce((a, b) => a + b)
  }

  // updates the my bag total price in cart overview 
  const updateCartOverviewTotalPrice = () => {
    document.querySelector(".cart-overview .total-price").textContent = JSON.parse(sessionStorage.getItem('cart')).reduce((a, c) => {
      const total = a + (c.price.current * c.quantity)
      return parseFloat(total.toFixed(2))
    }, 0)
  }

  // populate the cart overview by cart product datas in the session.
  // since sessions persist on page refresh, cart overview must be repopulated when the page is refreshed
  const populateCartOverviewBySessionCart = () => {
    let myCart = JSON.parse(sessionStorage.getItem('cart'))

    if(!myCart) {
      return
    }

    for(const product of myCart) {
      addCartOverviewItem(product)
    }

    updateCartOverviewTotalQuantity()
    updateCartOverviewTotalPrice()
  }

  return {
    add,
    populateCartOverviewBySessionCart
  }
})()