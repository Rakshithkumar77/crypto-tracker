import api from './api';

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const signup = (email, username, password) =>
  api.post('/auth/signup', { email, username, password });

export const getMe = () =>
  api.get('/auth/me');
