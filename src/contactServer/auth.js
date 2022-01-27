const axios = require('axios');

const url = 'http://localhost:5000/users/'

async function signUp(signUpRequestBody) {
    let response;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(signUpRequestBody)
    }

    await fetch(url + 'signup/', options)
        .then(async res => {
            const json = await res.json();
            response = json;
        }).catch(err => {
            console.error(err)
        })
    return response
}

async function login(handle, password) {
    let response;

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            handle: handle,
            pass: password
        })
    }

    await fetch(url + 'login/', options)
        .then(async res => {
            const json = await res.json();
            response = json
        }).catch(err => {
            console.error(err)
        })

    return response;
}

export {
    login,
    signUp
}
