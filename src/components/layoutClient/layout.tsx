import { useEffect } from 'react';
import Cookies from 'js-cookie';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('token');
      if (!token) {
        window.location.href = '/';
      }
    };

    checkToken();
    const intervalId = setInterval(checkToken, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
};

export default ClientLayout;
