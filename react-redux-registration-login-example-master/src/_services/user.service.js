const fetch = require("node-fetch");
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

//const URL = 'https://localhost:44312';
const URL = 'http://stdbank.retrotest.co.za/api/DummyModels';

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    };
    console.log("login attempt");
    return fetch(`${URL}/users/login?username=${username}&pass=${password}`, requestOptions)
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
        cache: 'no-cache',
        headers: authHeader()
    };

    return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        cache: 'no-cache',
        headers: authHeader()
    };

    return fetch(`${URL}/users/getUser/?id=/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    console.log(JSON.stringify(user));
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type':'application/json' 
        },
        body: JSON.stringify({
            FirstName: user.firstName,
            LastName: user.lastName,
            Username: user.username,
            Password: user.password
        })
    };

    return fetch(`${URL}/users/register`, requestOptions).then(
        function(handleResponse){
            console.log(handleResponse);
        }
    );
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        cache: 'no-cache',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "Id": user.Id,
            "FirstName": user.FirstName,
            "LastName": user.LastName,
            "Username": user.Username,
            "Password": user.Password
        })
    };

    return fetch(`${URL}/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        cache: 'no-cache',
        headers: authHeader()
    };

    return fetch(`${URL}/users/delete/${id}`, requestOptions).then(handleResponse);
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