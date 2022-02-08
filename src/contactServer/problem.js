const url = 'http://localhost:5000/problems/'

export async function createProblem(problem){
    console.log('in create problem function!')
    console.log(problem)
    let response;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'BEARER '+localStorage.getItem('accessToken')
        },
        body: JSON.stringify(problem)
    }
    await fetch(url + '/create/', options)
        .then(async res => {
            const json = await res.json();
            response = json;
            console.log(json)
            return response
        })
}