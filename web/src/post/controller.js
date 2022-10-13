

import { displayModal } from "../utils/utils.js"



export default class PostController {
    constructor(postModel, postView) {
        this.model = postModel
        this.view = postView
        this.displayPost()
        this.view.bindCommentCount(this.handleCommentCountClick)

    }

    displayPost = () => {
        this.view.displayPost(this.model.get(), this.handleNewComment)
    }

    handleCommentCountClick = (displayStatus) => {
        if (displayStatus === "none") {
            this.view.displayCommentSection()
            this.model.getPostComments(this.view.commentSection).then((commentControllers)=> {
                this.commentControllers = commentControllers
                this.displayComments()
            })
        } else {
            this.view.closeCommentSection()
        }

    }

    displayComments = () => {
        this.commentControllers.forEach((commentController)=>{
            commentController.displayComment()
        })
    }

    handleNewComment = (comment, displayStatus) => {
        if (comment !== "" && comment !== undefined && comment !== null) {
            if (displayStatus === "none") {
                this.view.displayCommentSection()
            }else {
                this.view.clearCommentSection()
            }
            this.model.sendNewComment(comment).then(()=>{
                this.model.getPostComments(this.view.commentSection).then((commentControllers)=> {
                    this.commentControllers = commentControllers
                    this.displayComments()
                })
            })
        }
    }

}