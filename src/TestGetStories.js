import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
};

export default function() {
    const uniqEmail = new Date().getTime();

    const requestRegister = {
        name: "Test Name",
        email: `${uniqEmail}@gmail.com`,
        password: "11112222"
    }

    const responseRegister = http.post("http://localhost:3000/register", JSON.stringify(requestRegister), {
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

    http.get("http://localhost:3000/stories", {
        headers: {
            "Accept": "application/json",
            "Authorization": token
        }
    });

    
}