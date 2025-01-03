import { loginUser, registerUser } from './helper/user.js';
import { getAllStory } from './helper/story.js';

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

    registerUser(requestRegister)

    // Login
    const requestLogin = {
        email: `${uniqEmail}@gmail.com`,
        password: "11112222"
    };
    
    const responseLogin = loginUser(requestLogin)
    const token = `Bearer ${responseLogin.json().loginResult.token}`;

    // Get Stories
    getAllStory(token)
}