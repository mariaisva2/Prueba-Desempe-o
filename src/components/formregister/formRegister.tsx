import React, { useState, useContext } from 'react';
import CustomForm from '../UI/Form/formH';
import CustomInput from '../UI/input/input';
import CustomLabel from '../UI/label/label';
import CustomButton from '../UI/button/button';
import { I18nContext } from '../../app/¡18n/Provider';
import styled from 'styled-components';

export interface IRegisterCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

interface IRegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ onSwitchToLogin }) => {
  const i18nContext = useContext(I18nContext);
  if (!i18nContext) {
    throw new Error("I18nContext is not available");
  }

  const { t, changeLanguage } = i18nContext;

  const [step, setStep] = useState<number>(1);
  const [credentials, setCredentials] = useState<IRegisterCredentials>({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (field: keyof IRegisterCredentials) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [field]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (step === 1) {
        const { name, email, username } = credentials;
        if (!name || !email || !username) {
          alert(t("register.completeFields"));
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (!credentials.password || !confirmPassword) {
          alert(t("register.completeFields"));
          return;
        }
        if (credentials.password !== confirmPassword) {
          alert(t("register.passwordMismatch"));
          return;
        }
        setStep(3);
      } else if (step === 3) {
        const response = await fetch('http://192.168.88.39:7000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || t("register.error"));
        }

        alert(t("register.success"));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t("register.unknownError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledRegisterContainer>
      <StyledNavbar>
        <select onChange={(e) => changeLanguage(e.target.value)}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </StyledNavbar>
      <StyledFormWrapper>
        <CustomForm title={t("register.title")} onSubmit={handleSubmit}>
          <p className="form-subtitle">{t("register.subtitle")}</p>
          {error && <p className="error-message">{error}</p>}

          {step === 1 && (
            <>
              <CustomLabel text={t("register.name")} htmlFor="name" />
              <CustomInput
                type="text"
                id="name"
                name="name"
                placeholder={t("register.namePlaceholder")}
                value={credentials.name}
                onChange={handleChange('name')}
              />

              <CustomLabel text={t("register.email")} htmlFor="email" />
              <CustomInput
                type="email"
                id="email"
                name="email"
                placeholder={t("register.emailPlaceholder")}
                value={credentials.email}
                onChange={handleChange('email')}
              />

              <CustomLabel text={t("register.username")} htmlFor="username" />
              <CustomInput
                type="text"
                id="username"
                name="username"
                placeholder={t("register.usernamePlaceholder")}
                value={credentials.username}
                onChange={handleChange('username')}
              />
            </>
          )}

          {step === 2 && (
            <>
              <CustomLabel text={t("register.password")} htmlFor="password" />
              <CustomInput
                type="password"
                id="password"
                name="password"
                placeholder={t("register.passwordPlaceholder")}
                value={credentials.password}
                onChange={handleChange('password')}
              />

              <CustomLabel text={t("register.confirmPassword")} htmlFor="confirmPassword" />
              <CustomInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t("register.confirmPasswordPlaceholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <CustomLabel text={t("register.phone")} htmlFor="phone" />
              <CustomInput
                type="text"
                id="phone"
                name="phone"
                placeholder={t("register.phonePlaceholder")}
                value={credentials.phone}
                onChange={handleChange('phone')}
              />
            </>
          )}

          <CustomButton type="submit" className="sign-in-button" disabled={loading}>
            {loading ? t("register.loading") : step === 3 ? t("register.register") : t("register.continue")}
          </CustomButton>

          <p className="form-footer">
            {t("register.question")}
            <a href="#login" onClick={onSwitchToLogin}> {t("register.loginLink")}</a>
          </p>
        </CustomForm>
      </StyledFormWrapper>
    </StyledRegisterContainer>
  );
};

export default RegisterForm;

// Styled Components
const StyledRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
`;

const StyledNavbar = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  background-color: #681a67;
  color: white;

  select {
    padding: 0.5rem;
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const StyledFormWrapper = styled.div`
  background-color: #ffb5ff;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: white;

  .form-subtitle {
    color: #000000;
    margin-bottom: 1rem;
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
  }

  .form-footer {
    color: #5b115b;
    margin-top: 1rem;
    text-align: center;
  }

  .sign-in-button {
    margin-top: 1rem;
    background-color: #680c67;
    color: white;
  }
`;
