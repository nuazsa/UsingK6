import http from "k6/http";
import { check, fail } from "k6";


export function registerUser(body) {
  const responseRegister = http.post("http://localhost:3000/register", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

  const checkRegister = check(responseRegister, {
    "response code was 200": (res) => res.status == 201,
    "user was created": (res) => res.json().message === "User created",
  });

  if (!checkRegister) {
    fail(`Failed to login register`);
  }

  return responseRegister;
}

export function loginUser(body) {
  const responseLogin = http.post("http://localhost:3000/login", JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  const checkLogin = check(responseLogin, {
    'login response code was 200': (res) => res.status === 200,
    'login response token was exist': (res) => res.json().loginResult?.token != null
  });

  if (!checkLogin) {
    fail(`Failed to login user`);
  }

  return responseLogin;
}
