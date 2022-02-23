import {postSomething} from "./basicGetPost";

const url = 'http://localhost:5000/problems/'

export async function submit(contestId, problemId, code){
    const result = await postSomething(url+'/submit/', {contestId, problemId, time: Date.now().toString(), code});
    return result;
}
export async function getSubmissionResult(contestId, problemId, submissionId){
    const result = await postSomething(url+'/submission/', {contestId, problemId, submissionId});
    return result;
}
export async function getUserSubmissions(handle){
    console.log(handle)
    return await postSomething(url+'user-submissions/', {handle})
}