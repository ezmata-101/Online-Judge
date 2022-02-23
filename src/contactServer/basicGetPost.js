export async function postSomething(url, jsonBody){
    // console.log('in post something function!')
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'BEARER '+localStorage.getItem('accessToken')
        },
        body: JSON.stringify(jsonBody)
    }
    const response = await fetch(url, options);
    const json = await response.json()
    console.log(json);
    return json
}