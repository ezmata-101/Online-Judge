class Comment{
    constructor(commenter, blogId, commentId) {
        this.commenter = commenter;
        this.blogId = blogId;
        this.commentId = commentId;
    }
    getAsJSON(){
        return {
            commenter: this.commenter,
            blogId: this.blogId,
            commentId: this.commentId
        }
    }
}

export default Comment;