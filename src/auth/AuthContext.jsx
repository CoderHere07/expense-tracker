import { createContext, useContext, useMemo, useState } from 'react';
import * as api from './auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(api.getSession);

  const value = useMemo(() => ({
    user,
    login: data => setUser(api.login(data)),
    signup: data => setUser(api.signup(data)),
    logout: () => { api.logout(); setUser(null); },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);