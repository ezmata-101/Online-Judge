import {postSomething} from "./basicGetPost";

const url = "http://localhost:5000/blogs/"

export async function createBlog(blogTitle, blogBody) {
    const jsonBody = {blogTitle, blogBody, created: Date.now().toString()};
    console.log(jsonBody)
    return await postSomething(url + 'create-blog', jsonBody)
}
export async function createTutorial(blogTitle, contestId, problemId, blogBody) {
    return await postSomething(url + 'create-tutorial', {blogTitle, contestId, problemId, blogBody, created: Date.now()})
}
export async function getBlogs(){
    const res = await fetch(url+'/blogs')
    return await res.json()
}
export async function getBlogsByUser(handle){
    return await postSomething(url+'/getUserBlogs', {handle})
}
export async function getBlog(blogId){
    return await postSomething(url+'/get/', {blogId})
}
export async function getBlogComments(blogId){
    return await postSomething(url+'getComments/', {blogId})
}

export async function postComment(blogId, comment){
    return await postSomething(url+'comment', {blogId, comment, time: Date.now().toString()})
}