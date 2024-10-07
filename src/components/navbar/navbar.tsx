import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { I18nContext } from '../../app/¡18n/Provider'; 
import LogoutButton from '../../components/logaut/logautbutton';
import { FaShoppingCart } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Cart from '../cart/cart';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const i18n = useContext(I18nContext); 
  const items = useSelector((state: RootState) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  if (!i18n) {
    return null; 
  }

  const { t, changeLanguage } = i18n;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  return (
    <StyledNavbar>
      <div className="navbar-content">
        <div className="navbar-items">
          <input
            type="text"
            placeholder={t('search')}
            className="search-bar"
          />
          <select onChange={handleLanguageChange} className="language-selector">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <div className="navbar-actions">
            <LogoutButton onLogout={onLogout} />
            <div className="cart" onClick={toggleModal}>
              <FaShoppingCart size={20} />
              {isClient && items.length > 0 && <span>{items.length}</span>}
            </div>
          </div>
        </div>
      </div>
      <Cart isOpen={isModalOpen} onClose={toggleModal} />
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #7d0f7c;
  color: #fff;
  border-bottom: 2px solid #680c67;
  z-index: 1000;

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar-items {
    display: flex;
    align-items: center;
    gap: 1rem;

    .search-bar {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #540853;
      background-color: #f0f0f0;
      color: #2b0029;
    }

    .language-selector {
      padding: 0.5rem;
      border-radius: 4px;
      background-color: #680c67;
      color: #fff;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #540853;
      }
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      button {
        background-color: #3f043e;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.9rem;

        &:hover {
          background-color: #2b0029;
        }
      }

      .cart {
        position: relative;
        cursor: pointer;
        color: white;

        span {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: red;
          color: white;
          border-radius: 50%;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }
      }
    }
  }
`;

export default Navbar;
