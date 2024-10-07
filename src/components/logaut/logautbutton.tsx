import React, { useContext } from 'react';
import Cookies from 'js-cookie';

import { I18nContext } from '../../app/¡18n/Provider'; 

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const i18n = useContext(I18nContext);

  if (!i18n) {
    return null; 
  }

  const { t } = i18n;

  const handleLogout = () => {
    Cookies.remove('token'); 
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      {t('logout')}
    </button>
  );
};

export default LogoutButton;

