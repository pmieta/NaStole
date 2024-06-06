import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch (e) {
    console.error('Error decoding token', e);
    return true;
  }
};
