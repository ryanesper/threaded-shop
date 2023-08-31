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
  const addCartOverviewItem = (item) => {
    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.id = item.id

    const itemDetails = document.createElement("div");
    itemDetails.className = "item-details";

    const img = document.createElement("img");
    img.src = `./assets/images/products/${item.imageName}`;
    img.alt = "";
    img.style.width = "100px";

    const description = document.createElement("div");
    description.className = item.description;

    const strong1 = document.createElement("strong");
    strong1.textContent = item.name;

    const p1 = document.createElement("p");
    p1.textContent = item.brand;

    const br = document.createElement("br");

    const p2 = document.createElement("p");
    p2.textContent = `Size: ${item.size}`;

    const p3 = document.createElement("p");
    p3.textContent = `Color: ${item.color}`;

    const qtySpan = document.createElement("span");
    qtySpan.className = "qty";
    qtySpan.textContent = item.quantity;
    
    const p4 = document.createElement("p");
    p4.textContent = "Qty: ";
    p4.appendChild(qtySpan);

    const strong2 = document.createElement("strong");
    strong2.textContent = item.price.current;

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

  // display product item in checkout list
  const addCheckoutItem = (item) => {
    var newItem = document.createElement("div");
    newItem.className = "item";
    newItem.id = item.id

    var innerDiv = document.createElement("div");

    var img = document.createElement("img");
    img.src = `./assets/images/products/${item.imageName}`;
    img.alt = "";
    img.width = "200";

    var detailsDiv = document.createElement("div");

    var name = document.createElement("p");
    var strong = document.createElement("strong");
    strong.textContent = item.name;
    name.appendChild(strong);

    var brand = document.createElement("p");
    brand.textContent = item.brand;

    var sizeColorQty = document.createElement("p");
    sizeColorQty.innerHTML = "Size: <span>" + item.size + "</span>, Color: <span>" + item.color + "</span>, Qty: " + item.quantity;

    var styleNo = document.createElement("small");
    styleNo.textContent = "Style No. " + item.styleNumber;

    var actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    var saveLink = document.createElement("a");
    saveLink.href = "#";
    saveLink.textContent = "save for later";

    var moveLink = document.createElement("a");
    moveLink.href = "#";
    moveLink.textContent = "move to favorites";

    var removeLink = document.createElement("a");
    removeLink.href = "#";
    removeLink.textContent = "remove";
    removeLink.onclick = function() {
      removeItem(item.id)
      alert(`${item.name} successfully removed!`);
    };

    var editLink = document.createElement("a");
    editLink.href = "#";
    editLink.textContent = "edit";

    actionsDiv.appendChild(saveLink);
    actionsDiv.appendChild(moveLink);
    actionsDiv.appendChild(removeLink);
    actionsDiv.appendChild(editLink);

    detailsDiv.appendChild(name);
    detailsDiv.appendChild(brand);
    detailsDiv.appendChild(sizeColorQty);
    detailsDiv.appendChild(styleNo);
    detailsDiv.appendChild(actionsDiv);

    var price = document.createElement("strong");
    var priceSpan = document.createElement("span");
    priceSpan.textContent = `$${(item.price.current * item.quantity).toFixed(2)}`;
    price.appendChild(priceSpan);

    innerDiv.appendChild(img);
    innerDiv.appendChild(detailsDiv);
    innerDiv.appendChild(price);

    newItem.appendChild(innerDiv);

    document.querySelector(".cart .content .items").appendChild(newItem);
  }

  // adds a single quantity to an item in cart overview
  const updateCartOverviewItem = (id, qtyToAdd = 1) => {
    const itemQtyEl = document.querySelector(`.cart-overview .item[id='${id}'] .qty`)

    itemQtyEl.textContent = parseInt(itemQtyEl.textContent) + qtyToAdd
  }

  // calculate and returns the total number of quantity from the cart
  const getTotalQuantity = () => {
    return JSON.parse(sessionStorage.getItem('cart')).map(c => c.quantity).reduce((a, b) => a + b, 0)
  }

  // calculate and returns the total price of items from the cart
  const getTotalPrice = () => {
    return JSON.parse(sessionStorage.getItem('cart')).reduce((a, c) => {
      const total = a + (c.price.current * c.quantity)
      return parseFloat(total.toFixed(2))
    }, 0)
  }

  // updates the my bag total quantity in cart overview 
  const updateCartOverviewTotalQuantity = () => {
    document.querySelector(".cart-overview .total-qty").textContent = getTotalQuantity()
  }

  // updates the my bag total price in cart overview 
  const updateCartOverviewTotalPrice = () => {
    document.querySelector(".cart-overview .total-price").textContent = getTotalPrice()
  }

  const updateCheckoutTotalQuantiy = () => {
    document.querySelector(".checkout .estimates .total-qty").textContent = getTotalQuantity()
  }

  const updateCheckoutTotalPrice = () => {
    document.querySelector(".checkout .estimates .total-price").textContent = getTotalPrice()
    document.querySelector(".checkout .estimates .grand-total-price").textContent = getTotalPrice()
  }

  // populate the cart overview by cart products in the session
  const populateCartOverview = () => {
    let myCart = JSON.parse(sessionStorage.getItem('cart'))

    if(!myCart) {
      return
    }

    for(const item of myCart) {
      addCartOverviewItem(item)
    }

    updateCartOverviewTotalQuantity()
    updateCartOverviewTotalPrice()
  }

  // populate the cart overview by cart products in the session
  const populateCheckoutItems = () => {
    let myCart = JSON.parse(sessionStorage.getItem('cart'))

    if(!myCart) {
      return
    }

    for(const item of myCart) {
      addCheckoutItem(item)
    }

    updateCheckoutTotalQuantiy()
    updateCheckoutTotalPrice()
  }

  const removeItem = (id) => {
    document.querySelector(`.cart .items .item[id='${id}']`).remove()

    const myCart = JSON.parse(sessionStorage.getItem('cart'))
    const filteredItems = myCart.filter(mc => mc.id != id)

    sessionStorage.setItem('cart', JSON.stringify(filteredItems));

    updateCartOverviewTotalQuantity()
    updateCartOverviewTotalPrice()
    updateCheckoutTotalQuantiy()
    updateCheckoutTotalPrice()
  }

  return {
    add,
    populateCartOverview,
    populateCheckoutItems
  }
})()