import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import CustomInput from '../UI/input/input';
import CustomLabel from '../UI/label/label';
import CustomButton from '../UI/button/button';
import Cookies from 'js-cookie'; 
import { ILoginCredentials } from '../../Interface/loginCredentials'; 
import { I18nContext } from '../../app/¡18n/Provider';
import CustomForm from '../UI/Form/formH';

const Navbar: React.FC = () => {
  const i18nContext = useContext(I18nContext);
  
  if (!i18nContext) {
    throw new Error("I18nContext is not available");
  }

  const { changeLanguage } = i18nContext;

  return (
    <StyledNavbar>
      <StyledLanguageSelector>
        <select onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </StyledLanguageSelector>
    </StyledNavbar>
  );
};

interface LoginFormProps {
  onSwitchToRegister: () => void; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const i18nContext = useContext(I18nContext);
  
  if (!i18nContext) {
    throw new Error("I18nContext is not available");
  }

  const { t } = i18nContext;
  const [credentials, setCredentials] = useState<ILoginCredentials>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://192.168.88.39:7000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials), 
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      
      Cookies.set('token', data.token); 
      setIsLoggedIn(true); 
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/Home';
    }
  }, [isLoggedIn]);

  return (
    <StyledLoginContainer>
      <Navbar /> 
      <StyledLoginFormWrapper>
        <CustomForm title={t("login.title")} onSubmit={handleSubmit}>
          <p className="form-subtitle">{t("login.subtitle")}</p>
          
          <CustomLabel text={t("login.username")} htmlFor="username" />
          <CustomInput
            type="text"
            id="username"
            name="username"
            placeholder={t("login.usernamePlaceholder")}
            value={credentials.username} 
            onChange={handleChange} 
          />
          
          <CustomLabel text={t("login.password")} htmlFor="password" />
          <CustomInput
            type="password"
            id="password"
            name="password"
            placeholder={t("login.passwordPlaceholder")}
            value={credentials.password} 
            onChange={handleChange} 
          />
          
          {error && <p className="error-message">{error}</p>}
          <CustomButton type="submit" className="sign-in-button" disabled={loading}>
            {loading ? t("login.loading") : t("login.submit")}
          </CustomButton>
          
          <p className="form-footer">
            {t("login.registerQuestion")} 
            <a href="#register" onClick={onSwitchToRegister}> {t("login.registerLink")}</a>
          </p>
        </CustomForm>
      </StyledLoginFormWrapper>
    </StyledLoginContainer>
  );
};

export default LoginForm;

// Styled Components

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #A47EFF; 
`;

const StyledLoginFormWrapper = styled.div`
  width: 30%;
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;

  .form-subtitle {
    font-size: 1.2rem;
    color: #000000;
    margin: 1rem 0;
  }

  .sign-in-button {
    background-color: #D18FFF; 
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-top: 3%;

    &:hover {
      background-color: #B475FF; 
    }
  }

  .form-footer {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #000000;

    a {
      color: #5052d1;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem;
  background-color: #2b0029;
`;

const StyledLanguageSelector = styled.div`
  select {
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    background-color: #D18FFF;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: #B475FF;
    }
  }
`;
