import http from 'k6/http';
import { loginUser, registerUser } from './helper/user.js';
import { postStory } from './helper/story.js';
import exec from 'k6/execution';

export const options = {
  scenarios: {
    registerUserSecenario: {
      exec: 'registerUserSecenario',
      executor: 'shared-iterations',
      vus: 5,
      iterations: 10,
      maxDuration: "30s"
    },

    story_creation_secenario: {
      exec: 'story_creation_secenario',
      executor: 'constant-vus',
      vus: 5,
      duration: '10s',
    }
  },
};

export function registerUserSecenario() {
  const uniqEmail = new Date().getTime()
  const requestRegister = {
    name: `name-${uniqEmail}`,
    email: `example-${uniqEmail}@gmail.com`,
    password: '11112222'
  }

  registerUser(requestRegister)
}

export function story_creation_secenario() {
  const numOfMail = (exec.vu.idInInstance % 9) + 1;

  const requestLogin = {
    email: `example${numOfMail}@gmail.com`,
    password: '11112222'
  }

  const responseLogin = loginUser(requestLogin);
  const token = 'Bearer ' + responseLogin.json().loginResult.token;

  const data = { description: "example story" }
  postStory(data, token)
}