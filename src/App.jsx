import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Tooltip,
  Button,
  Badge
} from '@mui/material';

// 🟢 Header Component
const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const stringToColor = (name) => {
    const colors = ['#1e88e5', '#e53935', '#43a047', '#fb8c00'];
    return colors[name.length % colors.length];
  };

  return (
<AppBar
  position="sticky"
  sx={{
    backgroundColor: '#111827',
    boxShadow: 3,
    top: 0,
    zIndex: 1100,
    left: 0,
    width: '100%',
    borderRadius: "12px", // fully flush with screen edges
  }}
>



      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Side: Navigation */}
 {/* Left: Brand */}
 <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.25rem',
        letterSpacing: '0.05rem',
        ml: 1,
      }}
    >
      ShopSavvy
    </Typography>
  </Box>

  {/* Center: Nav Buttons */}
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    sx={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    {/* Home Icon Button */}
    <Button
      variant="text"
      sx={{
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: '999px',
        px: 2,
        py: 1,
        minWidth: 44,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#1f2937',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        },
      }}
      onClick={() => navigate('/home')}
    >
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19" />
      </svg>
    </Button>

    {/* Cart Icon Button */}
    <Button
      variant="text"
      sx={{
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: '999px',
        px: 2,
        py: 1,
        minWidth: 44,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#1f2937',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        },
      }}
      onClick={() => navigate('/cart')}
    >
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2.787 2.28a.75.75 0 0 1 .932.508l.55 1.862h14.655c1.84 0 3.245 1.717 2.715 3.51l-1.655 5.6c-.352 1.194-1.471 1.99-2.715 1.99H8.113c-1.244 0-2.362-.796-2.715-1.99L2.281 3.213a.75.75 0 0 1 .506-.932M6.25 19.5a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0m8 0a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" />
      </svg>
      ({cart.length})
    </Button>
  </Box>

  {/* Right: Avatar + Logout */}
  <Box display="flex" alignItems="center" gap={2}>
    {/* Avatar + Logout Button (as before) */}
  </Box>

        {/* Right Side: Avatar + Logout */}
        <Box display="flex" alignItems="center" gap={2}>
          {user?.username && (
            <>
              <Tooltip title="Account settings">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: stringToColor(user.username), width: 36, height: 36 }}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1.5,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                    borderRadius: 2,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem disabled>
                  <Typography variant="body2"><strong>{user.username}</strong></Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="body2">{user.email}</Typography>
                </MenuItem>
              </Menu>
            </>
          )}

          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: '#ef4444',
              color: '#fff',
              borderRadius: 30,
              padding: '6px 18px',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#dc2626',
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// 🟢 Login Page
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'jerophin' && password === '1168') {
      alert('Login successful!');
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify({
        username: 'jerophin',
        email: 'jerophinstanley47@gmail.com',
      }));
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to <span style={{ color: '#2563eb' }}>ShopSavvy</span></h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

// 🟢 Home Page
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Simulate more sections by duplicating
        const duplicated = [...data, ...data, ...data]; // simulate 60 items
        setProducts(duplicated);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);
  

  const renderSection = (title, filterFn, start = 0, end = Infinity) => {
    const filtered = products.filter(filterFn).slice(start, end);
    if (filtered.length === 0) return null;
  
    return (
      <div key={title} style={{ marginBottom: 60 }}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        <div style={styles.productGrid}>
          {filtered.map(product => (
            <div
              key={`${product.id}-${title}`}
              style={styles.productCard}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.title} style={styles.productImage} />
              <h4 style={styles.productTitle}>{product.title}</h4>
              <p style={styles.productPrice}>$ {product.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const cart = JSON.parse(localStorage.getItem('cart')) || [];
                  cart.push(product);
                  localStorage.setItem('cart', JSON.stringify(cart));
                  alert('Added to cart!');
                }}
                style={styles.addToCartButton}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  
  const heroSlides = [
    {
      title: "🎁 Special Offers",
      subtitle: "Grab the best deals before they're gone!",
      bgColor: "#f97316",
      buttonText: "View Offers",
      route: "/offers"
    },
    {
      title: "🔥 Hot Deals",
      subtitle: "Limited-time prices on top products!",
      bgColor: "#10b981",
      buttonText: "Explore Deals",
      route: "/deals"
    },
    {
      title: "🧭 Explore Categories",
      subtitle: "Browse by fashion, electronics, and more.",
      bgColor: "#3b82f6",
      buttonText: "Browse Categories",
      route: "/categories"
    },
    {
      title: "🚀 Trending Now",
      subtitle: "See what’s hot in the market today.",
      bgColor: "#9333ea",
      buttonText: "Check Trends",
      route: "/trending"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const current = heroSlides[currentSlide];
  
  return (
    <>
      <Header />
      <div style={styles.heroSection}>
      <button onClick={handlePrev} style={{ ...styles.heroNavButton, left: 32 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M31 36L19 24l12-12"
          />
        </svg>
      </button>

        <div style={{ ...styles.heroSlide, backgroundColor: current.bgColor }}>
          <h1 style={styles.heroTitle}>{current.title}</h1>
          <p style={styles.heroSubtitle}>{current.subtitle}</p>
          <button
            onClick={() => navigate(current.route)}
            style={styles.heroCTA}
          >
            {current.buttonText}
          </button>
        </div>

        <button onClick={handleNext} style={{ ...styles.heroNavButton, right: 32 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="m19 12l12 12l-12 12"
            />
          </svg>
        </button>
      </div>
      <div style={styles.home}>
      {renderSection('🔥 Trending Now', () => true, 0, 10)}
      {renderSection('🧥 Men\'s Fashion', p => p.category === "men's clothing")}
      {renderSection('👗 Women\'s Fashion', p => p.category === "women's clothing")}
      {renderSection('📱 Electronics', p => p.category === "electronics")}
      {renderSection('💍 Jewelry', p => p.category === "jewelery")}
      {renderSection('🧨 Hot Picks', () => true, 20, 30)}
      </div>
    </>
  );
};

// 🟢 Product Detail Page
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        // Fetch related products by category
        fetch(`https://fakestoreapi.com/products/category/${data.category}`)
          .then(res => res.json())
          .then(items => {
            const filtered = items.filter(p => p.id !== data.id); // exclude current
            setRelated(filtered);
          });
      });
  }, [id]);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div style={styles.productDetailWrapper}>
        <div style={styles.productDetailImageBox}>
          <img src={product.image} alt={product.title} style={styles.productDetailImage} />
        </div>

        <div style={styles.productDetailInfo}>
          <h2 style={styles.productDetailTitle}>{product.title}</h2>
          <p style={styles.productDetailCategory}>📦 Category: <strong>{product.category}</strong></p>

          <div style={styles.productDetailPriceBox}>
            <h3 style={styles.productDetailPrice}>$ {product.price}</h3>
            <span style={styles.productDetailStock}>✔ In Stock</span>
          </div>

          <div style={styles.productDetailRating}>
            ⭐ {product.rating?.rate || 4.5} ({product.rating?.count || '100+'} reviews)
          </div>

          <p style={styles.productDetailDesc}>{product.description}</p>

          <button onClick={() => addToCart(product)} style={styles.productDetailAddToCart}>
             Add to Cart
          </button>
        </div>
      </div>

      {/* 🔹 Related Products */}
      {related.length > 0 && (
        <div style={styles.relatedSection}>
          <h3 style={styles.relatedHeading}>🧩 Related Products</h3>
          <div style={styles.relatedProducts}>
            {related.map(item => (
              <div
                key={item.id}
                style={styles.relatedCard}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.title} style={styles.relatedImage} />
                <p style={styles.relatedTitle}>{item.title}</p>
                <p style={styles.relatedPrice}>$ {item.price}</p>
                <button
                  style={styles.relatedAddButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};



// 🟢 Cart Page
const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [showPopup, setShowPopup] = useState(false);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const changeQuantity = (index, delta) => {
    const newCart = [...cart];
    if (!newCart[index].qty) newCart[index].qty = 1;
    newCart[index].qty += delta;
    if (newCart[index].qty <= 0) newCart[index].qty = 1;
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const checkout = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      localStorage.removeItem('cart');
      setCart([]);
    }, 3000);
  };

  return (
    <>
      <Header />
      <div style={styles.cart}>
        <h2 style={styles.cartTitle}>🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <img src={item.image} alt={item.title} style={styles.cartImage} />
                <div style={{ flex: 1 }}>
                  <h4>{item.title}</h4>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>
                    {item.description?.substring(0, 80)}...
                  </p>
                  <div style={styles.cartItemDetails}>
                    <span style={styles.itemPrice}>$ {(item.price * (item.qty || 1)).toFixed(2)}</span>
                    <div style={styles.qtyControls}>
                      <button onClick={() => changeQuantity(index, -1)} style={styles.qtyBtn}>–</button>
                      <span style={styles.qtyText}>{item.qty || 1}</span>
                      <button onClick={() => changeQuantity(index, 1)} style={styles.qtyBtn}>+</button>
                    </div>
                    <button onClick={() => removeItem(index)} style={styles.removeBtn}>Remove</button>
                  </div>
                </div>
              </div>
            ))}

           {/* Modern Price Summary */}
            <div style={styles.cartSummaryCard}>
              <h3 style={styles.summaryTitle}>🧾 Order Summary</h3>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Tax (5%)</span>
                <span>$ {tax.toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Free</span>
              </div>

              <div style={styles.summaryDivider} />

              <div style={styles.summaryRow}>
                <strong>Total</strong>
                <strong style={{ fontSize: '1.2rem' }}>$ {total.toFixed(2)}</strong>
              </div>

              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>
                You saved <b>$ 0.00</b> on this order 🎉
              </div>
            </div>


            <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
                onClick={checkout}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: 16,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 6px 14px rgba(37, 99, 235, 0.3)',
                  marginRight: 16,
                  transition: 'all 0.3s ease',
                }}
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: 16,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 6px 14px rgba(239, 68, 68, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                Clear Cart
              </button>

            </div>

            {showPopup && <div style={styles.popup}>🎉 Order placed successfully!</div>}
          </>
        )}
      </div>
    </>
  );
};

// 🔹 Offers Page
const Offers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <>
      <Header />
      <div style={styles.pageSection}>
        <h2>🎁 Special Offers</h2>
        <p>Browse amazing limited-time offers available now!</p>
        <div style={styles.sectionGrid}>
          {products.map(p => (
            <div key={p.id} style={styles.productCard}>
              <img src={p.image} alt={p.title} style={styles.productImage} />
              <h4 style={styles.productTitle}>{p.title}</h4>
              <p style={styles.productPrice}>$ {p.price}</p>
              <button
                onClick={() => addToCart(p)}
                style={styles.addToCartButton}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


const Deals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <>
      <Header />
      <div style={styles.pageSection}>
        <h2>🔥 Hot Deals</h2>
        <p>Grab products with huge discounts!</p>
        <div style={styles.sectionGrid}>
          {products.filter(p => p.price < 50).map(p => (
            <div key={p.id} style={styles.productCard}>
              <img src={p.image} alt={p.title} style={styles.productImage} />
              <h4 style={styles.productTitle}>{p.title}</h4>
              <p style={styles.productPrice}>$ {p.price}</p>
              <button
                onClick={() => addToCart(p)}
                style={styles.addToCartButton}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


const Categories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  const categories = [
    { title: "👔 Men's Fashion", key: "men's clothing" },
    { title: "👗 Women's Fashion", key: "women's clothing" },
    { title: "💻 Electronics", key: "electronics" },
    { title: "💍 Jewelry", key: "jewelery" },
  ];

  return (
    <>
      <Header />
      <div style={styles.pageSection}>
        <h2>🧭 Categories</h2>
        {categories.map(cat => (
          <div key={cat.key}>
            <h3>{cat.title}</h3>
            <div style={styles.sectionGrid}>
              {products
                .filter(p => p.category === cat.key)
                .map(p => (
                  <div key={p.id} style={styles.productCard}>
                    <img src={p.image} alt={p.title} style={styles.productImage} />
                    <h4 style={styles.productTitle}>{p.title}</h4>
                    <p style={styles.productPrice}>$ {p.price}</p>
                    <button
                      onClick={() => addToCart(p)}
                      style={styles.addToCartButton}
                    >
                      + Add
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// 🔹 Trending Page
const Trending = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <>
      <Header />
      <div style={styles.pageSection}>
        <h2>🚀 Trending Now</h2>
        <p>Most viewed and popular items this week.</p>
        <div style={styles.sectionGrid}>
          {products.slice(0, 10).map(p => (
            <div key={p.id} style={styles.productCard}>
              <img src={p.image} alt={p.title} style={styles.productImage} />
              <h4 style={styles.productTitle}>{p.title}</h4>
              <p style={styles.productPrice}>$ {p.price}</p>
              <button
                onClick={() => addToCart(p)}
                style={styles.addToCartButton}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



// 🟢 App Entry
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* 🔹 Additional Routes for Hero Section */}
        <Route path="/offers" element={<Offers />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
}


export default App;

// 🟡 Inline Styles
const PRIMARY_COLOR = '#0B1220';

const styles = {
  heroSection: {
    position: 'relative',
    width: '100%',
    padding: '60px 20px',
    boxSizing: 'border-box',
  },
  
  heroSlide: {
    width: '100%',
    padding: '60px 30px',
    borderRadius: '24px',
    boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    boxSizing: 'border-box',
  },
  
  heroTitle: {
    fontSize: '2.4rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  
  heroSubtitle: {
    fontSize: '1.1rem',
    marginBottom: '30px',
    color: 'white',
  },
  
  heroCTA: {
    backgroundColor: '#fff',
    color: '#0d1320',
    padding: '12px 28px',
    fontWeight: 'bold',
    borderRadius: '999px',
    border: 'none',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  heroNavButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#0d1320',
    color: '#fff',
    border: 'none',
    width: 48,
    height: 48,
    borderRadius: '50%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 2,
  },
  
  fullPage: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  loginBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    maxWidth: '430px',
    width: '90%',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  
  
  loginTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#111827',
  },
  input: {
    width: '100%',
    margin: '12px 0',
    padding: '14px 18px',
    fontSize: 16,
    border: '1px solid #cbd5e1',
    borderRadius: 12,
    outline: 'none',
    backgroundColor: '#fefce8',
    boxSizing: 'border-box', // 🔧 important to prevent overflow
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B1220',
  },  
  loginButton: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: '16px 32px',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    borderRadius: '0 0 12px 12px',
  },
  link: {
    color: '#f9fafb',
    textDecoration: 'none',
    margin: '0 20px',
    fontWeight: 600,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: 25,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Segoe UI, sans-serif',
  },  
  input: {
    width: '100%',
    margin: '12px 0',
    padding: '14px 18px',
    fontSize: 16,
    border: '1px solid #cbd5e1',
    borderRadius: 12,
    outline: 'none',
    backgroundColor: '#fff',
  },
  loginButton: {
    padding: '14px 20px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    border: 'none',
    width: '100%',
    borderRadius: 30,
    cursor: 'pointer',
    marginTop: 15,
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
  },
  home: {
    padding: '40px 24px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B1220',
  },
  
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 32,
    marginTop: 30,
  },
  
  productCard: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    overflow: 'hidden',
  },
  
  productImage: {
    width: 150,
    height: 170,
    objectFit: 'contain',
    marginBottom: 16,
  },
  
  productTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginTop: 8,
    color: '#1f2937',
  },
  
  productPrice: {
    fontSize: '0.9rem',
    color: '#374151',
    marginBottom: 12,
  },
  
  addToCartButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#111827',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  
  detail: {
    padding: 50,
    display: 'flex',
    gap: 50,
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    fontFamily: 'Segoe UI, sans-serif',
  },
  detailImage: {
    width: 340,
    height: 360,
    objectFit: 'contain',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  cart: {
    padding: 40,
    maxWidth: 900,
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f1f5f9',
    minHeight: '100vh',
  },
  cartItem: {
    display: 'flex',
    gap: 24,
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
  },
  cartImage: {
    width: 100,
    height: 120,
    objectFit: 'contain',
    borderRadius: 8,
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: 12,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  checkoutBtn: {
    display: 'block',
    margin: '30px auto 0 auto',
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '16px 36px',
    fontSize: 16,
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 30,
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(16,185,129,0.3)',
  },
  popup: {
    textAlign: 'center',
    backgroundColor: '#22c55e',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    fontWeight: 'bold',
  },
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '420px',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#0B1220',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '16px',
    margin: '10px 0',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fefce8',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: PRIMARY_COLOR, // ✅ Dark navy color
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 6px 16px rgba(11, 18, 32, 0.3)`, // Match button glow
  },
  productDetailWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 40,
    padding: '60px 40px',
    backgroundColor: '#f8fafc',
    fontFamily: 'Segoe UI, sans-serif',
  },
  
  productDetailImageBox: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
  },
  
  productDetailImage: {
    maxWidth: 300,
    maxHeight: 350,
    objectFit: 'contain',
  },
  
  productDetailInfo: {
    flex: '1 1 500px',
    padding: 20,
  },
  
  productDetailTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10,
  },
  
  productDetailCategory: {
    fontSize: 16,
    marginBottom: 8,
    color: '#6b7280',
  },
  
  productDetailPriceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  
  productDetailPrice: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#111827',
  },
  
  productDetailStock: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
  },
  
  productDetailRating: {
    fontSize: 16,
    marginBottom: 16,
    color: '#f59e0b',
    fontWeight: 600,
  },
  
  productDetailDesc: {
    fontSize: 15,
    lineHeight: 1.6,
    color: '#374151',
    marginBottom: 30,
  },
  
  productDetailAddToCart: {
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '999px',
    fontSize: 16,
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(37, 99, 235, 0.3)',
    transition: '0.3s ease',
  },
  relatedSection: {
    marginTop: 60,
    padding: '0 40px 60px 40px',
  },
  
  relatedHeading: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: 16,
    color: '#111827',
  },
  
  relatedProducts: {
    display: 'flex',
    overflowX: 'auto',
    gap: 24,
    paddingBottom: 10,
  },
  
  relatedCard: {
    minWidth: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    position: 'relative',
    transition: 'transform 0.2s ease',
  },
  
  relatedImage: {
    width: 100,
    height: 120,
    objectFit: 'contain',
    marginBottom: 10,
  },
  
  relatedTitle: {
    fontSize: 14,
    color: '#111827',
    fontWeight: 500,
    height: 38,
    overflow: 'hidden',
    marginBottom: 6,
  },
  
  relatedPrice: {
    fontSize: 14,
    fontWeight: 600,
    color: '#10b981',
    marginBottom: 8,
  },
  
  relatedAddButton: {
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 13,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  cartTitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: '1.8rem',
    color: '#111827',
  },
  
  cartItemDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#10b981',
  },
  
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #d1d5db',
    borderRadius: 12,
    padding: '4px 10px',
  },
  
  qtyBtn: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    padding: '0 8px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  
  qtyText: {
    minWidth: 24,
    textAlign: 'center',
    fontWeight: 500,
  },
  
  cartSummary: {
    marginTop: 40,
    textAlign: 'right',
    padding: '0 10px',
    color: '#111827',
    fontSize: 16,
  },
  
  clearCartBtn: {
    backgroundColor: '#f3f4f6',
    color: '#ef4444',
    padding: '10px 20px',
    borderRadius: 20,
    fontWeight: 'bold',
    border: 'none',
    marginLeft: 16,
    cursor: 'pointer',
  },
  
  popup: {
    textAlign: 'center',
    backgroundColor: '#22c55e',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    fontWeight: 'bold',
  },
  cartSummaryCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(6px)',
    borderRadius: 20,
    padding: '28px 32px',
    marginTop: 40,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: 800,          // 🔥 Wider card
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  
  
  summaryTitle: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 8,
  },
  
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    margin: '16px 0',
  },
  // 🔹 For consistent modern layout
  pageSection: {
    padding: '60px 30px',
    backgroundColor: '#f8fafc',
    fontFamily: 'Segoe UI, sans-serif',
  },
  sectionHeader: {
    marginBottom: 10,
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#0B1220',
  },
  sectionDescription: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: 30,
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 32,
  },
          
};
