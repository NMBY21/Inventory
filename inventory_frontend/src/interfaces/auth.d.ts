export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextProps {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
