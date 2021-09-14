export function getAccessToken(){
    const user_info = localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")) : null;
    if (user_info && user_info?.idToken?.jwtToken) {
      return user_info?.idToken?.jwtToken;
    }
    return null;
};

export function getUserId(){
  const user_info = localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")) : null;
  if (user_info && user_info?.idToken?.payload?.sub) {
    return user_info?.idToken?.payload?.sub;
  }
  return null;
};

export function getAdmin(){
  const user_info = localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")) : null;
  if (user_info && user_info?.idToken?.payload?.['cognito:groups']?.includes('Admin')) {
    return true;
  }
  return false;
};

export function isAuthenticated(){
    if (getAccessToken()) {
        return true;
      } else {
        return false;
      }
};

export function getRefreshToken(){
    const user_info = localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")) : null;
    if (user_info && user_info?.refreshToken?.token) {
        return user_info?.refreshToken?.token;
    }
    return null;
};