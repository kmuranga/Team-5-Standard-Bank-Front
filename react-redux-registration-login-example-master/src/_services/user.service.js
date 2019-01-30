import config from 'config';
import { authHeader } from '../_helpers';
//import axios from "axios";
//import { type } from 'os';
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
var URL = 'https://localhost:44312';
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: /*JSON.stringify({ username, password })*/{
            "id": 1,
            "firstName": "Tafara",
            "lastName": "Tafara",
            "username": "me@gmail.com",
            "password": "123"
        }
    };
    console.log("login attempt");
    return fetch(`${URL}/api/DummyModels/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            console.log("handleResponse:"+handleResponse);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: authHeader()
    };

    return fetch(`${URL}/api/DummyModels`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: authHeader()
    };

    return fetch(`${URL}/api/DummyModels/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    console.log(JSON.stringify(user));
    const requestOptions = {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${URL}/api/DummyModels/2`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${URL}/api/DummyModels/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: authHeader()
    };

    return fetch(`${URL}/api/DummyModels/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}