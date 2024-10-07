import React, { useState } from 'react';
import './icom.scss';
import RegisterForm from '../formregister/formRegister';
import LoginForm from '../formlogin/formLogin';

const Auth: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setIsRegister(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegister(false);
  };

  return (
    <div className={`auth-container ${isRegister ? 'register' : 'login'}`}>
      {isRegister ? (
        <>
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        </>
      ) : (
        <>
          <LoginForm onSwitchToRegister={handleSwitchToRegister} />
        </>
      )}
    </div>
  );
};

export default Auth;
