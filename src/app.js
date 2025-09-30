document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('cta-signup');
  const checkoutBtn = document.getElementById('cta-checkout');
  const addToCartBtns = document.querySelectorAll('.add-to-cart');

  // Sign up click
  signupBtn.addEventListener('click', () => {
    if (!oncePerSession('sign_up_click')) return;
    const payload = {
      event: 'sign_up_click',
      timestamp: new Date().toISOString()
    };
    window.dataLayer.push(payload);
    console.log('sign_up_click enviado al dataLayer', payload);
  });

  // Add to cart
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!preventDuplicate('add_to_cart', 500)) return;

      const product = e.target.closest('.product');
      const payload = {
        event: 'add_to_cart',
        item_id: product.dataset.sku,
        item_name: product.dataset.name,
        price: parseFloat(product.dataset.price)
      };
      window.dataLayer.push(payload);
      sendAddToCart(payload);
      console.log('add_to_cart enviado al dataLayer', payload);
    });
  });

  // Begin checkout
  checkoutBtn.addEventListener('click', () => {
    const products = document.querySelectorAll('.product');
    let value = 0;
    products.forEach(p => value += parseFloat(p.dataset.price));

    const payload = {
      event: 'begin_checkout',
      value,
      currency: 'PEN'
    };
    window.dataLayer.push(payload);
    console.log('begin_checkout enviado al dataLayer', payload);
  });
});
