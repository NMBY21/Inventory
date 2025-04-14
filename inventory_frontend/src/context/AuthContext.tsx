import React, {createContext, useState, useEffect, ReactNode} from 'react';
import { AuthState, AuthContextProps, LoginCredentials } from '../interfaces/auth';
import axios from "axios";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });
  let isLoggedIn: boolean = !!localStorage.getItem('token');

  useEffect(() => {
    if (authState.token) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isLoggedIn = true;
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
      }));
      isLoggedIn = false;
    }
  }, [authState.token]);

  const login = async (credentials: LoginCredentials) => {
    try {
      // const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/login', credentials);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
      if (response.status === 200){
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        setAuthState({ token: access_token, isAuthenticated: true });
        isLoggedIn = true;
      } 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ token: null, isAuthenticated: false });
    isLoggedIn = false;
  };

  return (
      <AuthContext.Provider value={{ authState, login, logout, isLoggedIn }}>
        {children}
      </AuthContext.Provider>
  );
};
