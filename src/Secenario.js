import http from 'k6/http';
import { loginUser, registerUser } from './helper/user.js';
import { postStory } from './helper/story.js';
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';

export const options = {
  scenarios: {
    register_user_secenario: {
      exec: 'register_user_secenario',
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

const registerCounterUser = new Counter('user_registration_counter_success')
const storiesCounterUser = new Counter('uset_stories_counter_success')

export function register_user_secenario() {
  const uniqEmail = new Date().getTime()
  const requestRegister = {
    name: `name-${uniqEmail}`,
    email: `example-${uniqEmail}@gmail.com`,
    password: '11112222'
  }

  const registerResponse = registerUser(requestRegister)
  if (registerResponse.status == 201) return registerCounterUser.add(1)
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
  const storyResponse = postStory(data, token)

  if (storyResponse.status == 201) return storiesCounterUser.add(1)
}