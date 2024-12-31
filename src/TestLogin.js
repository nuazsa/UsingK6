import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '10s'
};

export default function() {
  const uniqEmail = new Date().getTime();

  /**
   * 
   * Register
   */
  const requestRegister = {
    name: "Test",
    email: uniqEmail + "@gmail.com",
    password: "11112222"
  }

  http.post("http://localhost:3000/register", JSON.stringify(requestRegister), {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  /**
   * 
   * Login
   */
  const requestLogin = {
    email: uniqEmail + "@gmail.com",
    password: "11112222"
  }

  const responseLogin = http.post("http://localhost:3000/login", JSON.stringify(requestLogin), {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
  });

  /**
   * 
   * Get token
   */
  const token = `Bearer ${responseLogin.json().loginResult.token}`
}
