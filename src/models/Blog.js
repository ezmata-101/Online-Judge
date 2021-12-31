class Blog{
    constructor(author, blogId, comments, category, likes, hates) {
        this.author = author;
        this.blogId = blogId;
        this.comments = comments;
        this.likes = likes;
        this.hates = hates;
        this.category = category;
    }
    getAsJSON(){
        return {
            author: this.author,
            blogId: this.blogId,
            comments: this.comments,
            category: this.category,
            likes: this.likes,
            hates: this.hates
        }
    }
}

export default Blog;