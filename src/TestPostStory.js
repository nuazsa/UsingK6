import http from 'k6/http';
import exec from 'k6/execution';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s'
};

export function setup() {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      description: `Story-${i}`
    });
  }
  return data;
}

export function getToken() {
  const email = `example${exec.vu.idInInstance}@gmail.com`;
  
  const requestLogin = {
    email: email,
    password: "11112222"
  }

  const responseLogin = http.post("http://localhost:3000/api/login", JSON.stringify(requestLogin), {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
  });

  return `Bearer ${responseLogin.json().data.token}`
}

export default function(data) {
  const token = getToken();

  console.log(token);
  for (let i = 0; i < data.length; i++) {
    const story = data[i];
    const responsePost = http.post("http://localhost:3000/api/stories", JSON.stringify(story), {
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": token
      }
    });

    check(responsePost, {
      'create status was 200': (res) => res.status === 201
    })
  }

}
