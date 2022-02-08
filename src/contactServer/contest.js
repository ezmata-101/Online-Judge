const url = 'http://localhost:5000/contests/'

export async function createContest(contest){
    console.log('in create contest function!')
    console.log(contest)
    let response;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'BEARER '+localStorage.getItem('accessToken')
        },
        body: JSON.stringify(contest)
    }
    await fetch(url + '/create/', options)
        .then(async res => {
            const json = await res.json();
            response = json;
            console.log(json)
        })
}