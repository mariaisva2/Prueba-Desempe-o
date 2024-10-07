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

  return (
    <StyledCart isOpen={isOpen}>
      <span className="close-button" onClick={onClose}>✖</span>
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.length > 0 ? (
          items.map((item:IitemCart) => (
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
    </StyledCart>
  );
};

// Styled Components
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
    max-height: calc(100% - 100px);
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center; /* Alinea verticalmente los elementos */
  }

  .item-image {
    width: 50px;  /* Ajusta el tamaño de la imagen según sea necesario */
    height: auto; /* Mantiene la relación de aspecto */
    margin-right: 10px; /* Espacio entre la imagen y el texto */
  }

  .delete {
  cursor: pointer;
}

.delete button {
  background-color: #680c67; /* Color de fondo del botón */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  padding: 5px 10px; /* Espaciado interno */
  font-size: 0.9rem; /* Tamaño de fuente */
  transition: background-color 0.3s ease; /* Efecto de transición */
}

.delete button:hover {
  background-color: #540853; /* Color de fondo al pasar el cursor */
}

  .button {
    background-color: #fc94f6;
  }
  .total {
    padding: 1rem;
    font-weight: bold;
  }
`;

export default Cart;
