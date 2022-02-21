import {postSomething} from "./basicGetPost";

const url = "http://localhost:3000/blogs/"

export async function createBlog(blogTitle, blogBody) {
    const jsonBody = {blogTitle, blogBody, created: Date.now().toString()};
    console.log(jsonBody)
    return await postSomething(url + 'create-blog', jsonBody)
}
export async function createTutorial(blogTitle, contestId, problemId, blogBody) {
    return await postSomething(url + 'create-tutorial', {blogTitle, contestId, problemId, blogBody, created: Date.now()})
}
export async function getBlog(blogId){
    fetch(url+'get/'+blogId)
        .then(async res => {
            return await res.json()
        })
}
export async function getBlogComments(blogId){
    fetch(url+'getComments/'+blogId)
        .then(async res => {
            return await res.json()
        })
}

export async function postComment(blogId, comment){
    return await postSomething(url+'comment', {blogId, comment, time: Date.now().toString()})
}