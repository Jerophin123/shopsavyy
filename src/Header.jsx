import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="header">
      <Link to="/home">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Header;
