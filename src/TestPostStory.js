import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '10s'
};

export default function() {
  const uniqEmail = new Date().getTime();

  const requestRegister = {
    name: "Test",
    email: `${uniqEmail}@gmail.com`,
    password: "11112222"
  }

  http.post("http://localhost:3000/register", JSON.stringify(requestRegister), {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  const requestLogin = {
    email: `${uniqEmail}@gmail.com`,
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
