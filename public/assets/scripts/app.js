document.addEventListener('DOMContentLoaded', function() {
  const myCartEl = document.querySelector(".my-cart")
  const cartOverviewEl = document.querySelector(".cart-overview")

  myCartEl.addEventListener('mouseenter', () => cartOverviewEl.style.display = 'block');
  myCartEl.addEventListener('mouseleave', () => cartOverviewEl.style.display = 'none');
  cartOverviewEl.addEventListener('mouseenter', () => cartOverviewEl.style.display = 'block');
  cartOverviewEl.addEventListener('mouseleave', () => cartOverviewEl.style.display = 'none');

  Cart.populateCartOverview()
});