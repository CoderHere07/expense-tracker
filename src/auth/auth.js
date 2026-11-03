const USERS_KEY = 'et_users';
const SESSION_KEY = 'et_session';

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export const getSession = () => read(SESSION_KEY, null);

export const login = ({ email, password }) => {
  const user = read(USERS_KEY, []).find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const signup = ({ name, email, password }) => {
  const users = read(USERS_KEY, []);
  if (users.some(u => u.email === email)) throw new Error('Email already registered');
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, { name, email, password }]));
  return login({ email, password });
};

export const logout = () => localStorage.removeItem(SESSION_KEY);