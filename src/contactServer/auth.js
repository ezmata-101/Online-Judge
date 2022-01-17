const axios = require('axios');

const url = 'http://localhost:5000/users/'

function signup(handle, password){
    let response;
    axios.post(url+'signup/', {
        handle: handle,
        password: password
    }).then(res => {
        response = res;
    }).catch(err => {
        console.error(err)
        throw err;
    })
}

async function login(handle, password) {
    let response;
    // axios.post(url+'login', {
    //     handle: handle,
    //     password: password
    // }).then(res => {
    //     response = res;
    // }).catch(err => {
    //     console.error(err)
    //     throw err;
    // })

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

    // fetch(url+'login/', options)
    //     .then(async res => {
    //         console.log(res)
    //         return await res.json()
    //     }).then(res => {
    //         console.log(res)
    //     }).catch(err => {
    //         console.error(err)
    // })
    await fetch(url + 'login/', options)
        .then(async res => {
            console.log(res.status)
            console.log(res)
            const json = await res.json();
            response = json

            // console.log('auth: '+json)
        }).catch(err => {
            console.error(err)
        })

    return response;
}

export {
    login,
    signup
}
