export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  
  if (userStr) {
    user = JSON.parse(userStr);
  }

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return { 'x-access-token': null };
  }
}
