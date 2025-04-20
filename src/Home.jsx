import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // create this file if you want styling

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="home">
      <h2>🛍️ Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

