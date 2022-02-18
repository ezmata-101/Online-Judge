import {postSomething} from "./basicGetPost";

const url = 'http://localhost:5000/problems/'

export async function createProblem(problem){
    const result = await postSomething(url+'/create/', problem);
    console.log(result)
}
export async function getContestProblem(contestId){
    const result = await postSomething(url + 'contestProblem', contestId)
    return result
}
export async function getProblemDetail(contestId, problemId){
    const result = await postSomething(url+'problemDetail/', {contestId, problemId})
    return result
}