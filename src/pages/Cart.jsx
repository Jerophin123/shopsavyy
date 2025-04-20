import { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [showPopup, setShowPopup] = useState(false);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const checkout = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      localStorage.removeItem('cart');
      setCart([]);
    }, 4000);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="cart">
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={checkout}>Checkout</button>
      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  );
};

export default Cart;
