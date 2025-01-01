import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
};

export default function() {
    const uniqEmail = new Date().getTime();

    // Register
    const requestRegister = {
        name: "Test Name",
        email: `${uniqEmail}@gmail.com`,
        password: "11112222"
    };

    const responseRegister = http.post("http://localhost:3000/register", JSON.stringify(requestRegister), {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    const checkRegister = check(responseRegister, {
        'response code was 200': (res) => res.status == 201,
        'user was created': (res) => res.json().message === "User created",
    });

    if (!checkRegister) {
        fail(`Failed to register user ${uniqEmail}@gmail.com`);
    }

    // Login
    const requestLogin = {
        email: `${uniqEmail}@gmail.com`,
        password: "11112222"
    };

    const responseLogin = http.post("http://localhost:3000/login", JSON.stringify(requestLogin), {
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
        fail(`Failed to login user ${uniqEmail}@gmail.com`);
    }

    // Get Stories
    const token = `Bearer ${responseLogin.json().loginResult.token}`;

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
}