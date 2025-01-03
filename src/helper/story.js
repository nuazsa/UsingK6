import http from 'k6/http';
import { check, fail } from 'k6';

export function getAllStory(token) {
  const responseStories = http.get("http://localhost:3000/stories", {
    headers: {
      "Accept": "application/json",
      "Authorization": token
    }
  });

  const checkStory = check(responseStories, {
    'story response code was 200': (res) => res.status === 200,
    'story was exist': (res) => res.json().listStory != null
  });

  if (!checkStory) {
    fail(`Failed to fetch story`);
  }

  return responseStories;
}

export function postStory(body, token) {
  const responsePost = http.post("http://localhost:3000/stories", JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": token
    }
  });

  const checkPost = check(responsePost, {
    'create status was 200': (res) => res.status === 201
  });
  
  if (!checkStory) {
    fail(`Failed to upload story`);
  }
  return responseStories;
}