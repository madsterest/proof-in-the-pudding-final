import decode from "jwt-decode";

class AuthService {
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getUserId(token) {
    try {
      const decoded = decode(token);
      const id = decoded.data._id;
      return id;
    } catch (err) {
      return false;
    }
  }
  getUserName(token) {
    try {
      const decoded = decode(token);
      const username = decoded.data.username;
      return username;
    } catch (err) {
      return false;
    }
  }
}

export default new AuthService();
