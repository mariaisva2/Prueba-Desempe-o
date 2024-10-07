import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeItem } from '../../redux/Slice/slice';
import { IitemCart } from '../../redux/interface/itemcart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((total, item: IitemCart) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (!token) {
        alert('No se encontró el token. Por favor inicie sesión nuevamente.');
        return;
      }

      const products = items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await fetch('http://192.168.88.39:7000/auth/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products,
          totalItems: items.length,
          priceTotal: totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el checkout');
      }

      alert(data.message); 
     
      items.forEach(item => handleRemoveItem(item.id));
      onClose(); 

    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
      console.error('Error en el checkout:', error);
    }
  };

  return (
    <StyledCart isOpen={isOpen}>
      <span className="close-button" onClick={onClose}>✖</span>
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.length > 0 ? (
          items.map((item: IitemCart) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div>
                <p>{item.title}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="delete">
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="total">Total: ${totalPrice.toFixed(2)}</div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </StyledCart>
  );
};


const StyledCart = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #7d0f7c;
  border-left: 2px solid #680c67;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 1001;

  .close-button {
    cursor: pointer;
    font-size: 1.5rem;
    margin: 1rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .cart-items {
    padding: 1rem;
    overflow-y: auto;
    max-height: calc(100% - 150px); /* Ajuste para el botón de checkout */
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
  }

  .item-image {
    width: 50px;
    height: auto;
    margin-right: 10px;
  }

  .delete button {
    background-color: #680c67;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .delete button:hover {
    background-color: #540853;
  }

  .total {
    padding: 1rem;
    font-weight: bold;
  }

  .checkout-button {
    background-color: #fc94f6;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin: 1rem;
    width: calc(100% - 2rem); /* Full width with margin */
    transition: background-color 0.3s ease;
  }

  .checkout-button:hover {
    background-color: #540853;
  }
`;

export default Cart;
