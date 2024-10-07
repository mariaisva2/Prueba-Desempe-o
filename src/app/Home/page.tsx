"use client"
"use client";
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import ClientLayout from '../../components/layoutClient/layout';
import Product from '../../components/products/products';
import Navbar from '../../components/navbar/navbar'; 
import { I18nProvider } from '../¡18n/Provider';

import './Home.scss'; 

const HomePage: React.FC = () => {
  const handleLogout = () => {
   
  };

  return (
    <Provider store={store}>
      <I18nProvider> 
        <ClientLayout>
       
          <Navbar onLogout={handleLogout} /> 
          <Product selectedCategory="" /> 
         
        </ClientLayout>
      </I18nProvider>
    </Provider>
  );
};

export default HomePage;

