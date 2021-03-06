import {postSomething} from "./basicGetPost";

const url = 'http://localhost:5000/contests/'


export async function createContest(contest){
    return postSomething(url+'create/', contest)
}

export async function getContestDetail(contestId){
    return postSomething(url+'get', contestId)
}

export async function generateStandings(contestId){
    return await postSomething(url+'generateResult', {contestId})
}

export async function getContestStanding(contestId) {
    return await postSomething(url + 'getResult', {contestId})
}
