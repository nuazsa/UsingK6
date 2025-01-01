import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  vus: 10,
  duration: '10s'
};

export default function() {
  const email = `example${exec.vu.idInInstance}@gmail.com`;
  
  const requestLogin = {
    email: email,
    password: "11112222"
  }

  const responseLogin = http.post("http://localhost:3000/login", JSON.stringify(requestLogin), {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
  });

  const token = `Bearer ${responseLogin.json().loginResult.token}`

  const requestPostStory = {
    description: "lorem ipsum dolor sit amet"
  }
  
  http.post("http://localhost:3000/stories", JSON.stringify(requestPostStory), {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token
    }
  })
}
