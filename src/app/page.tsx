"use client"
import React from 'react';
import { I18nProvider } from './¡18n/Provider'; 
import Auth from '../components/icon/icom';

export default function Home() {
  return (
    <I18nProvider>
      <div>
        <Auth />
      </div>
    </I18nProvider>
  );
}
