
import Comment from '../comment/model.js'
import CommentView from '../comment/view.js'
import CommentController from '../comment/controller.js'
import { displayModal } from '../utils/utils.js'

export default class Post {
    constructor({ id, author, title, text, comments, category }) {
        this.id = id
        this.author = author
        this.title = title
        this.text = text
        this.nComments = comments
        this.category = category
        this.commentURL = `/comment`
    }

    get = () => {
        return {
            id: this.id,
            author: this.author,
            title: this.title,
            text: this.text,
            nComments: this.nComments,
            category: this.category,
        }
    }


    getPostComments = async (parentElement) => {
        const comments = await fetch(`${this.commentURL}?post_id=${this.id}`, {
            method: "GET",
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(Error(response.statusText))
            }
            return response.json()
        }).then((json) => {
            if (json.error != null || json.error != undefined) {
                return Promise.reject(Error(json.error))
            }
            let comments = []
            json.comments.forEach(c => {
                const comment = new CommentController(new Comment(c), new CommentView(parentElement))
                comments.push(comment)
            })
            return comments
        }).catch((e) => {
            displayModal(e)
        })

        return comments

    }

    sendNewComment = async (comment) => {
        let body = {
            post_id: this.id,
            text: comment,
        }
        await fetch(`${this.commentURL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
           
            },
            body: JSON.stringify(body)

        }).then((response) => {
            if (!response.ok) {
                if (response.status === 401 || response.status === 500 || response.status === 400) {
                    return response.json()
                }
            }
            return response.json()
        }).then((json) => {
            if (json.error != null || json.error != undefined) {
                return Promise.reject(Error(json.error))
            }
        }).catch((e) => {
            displayModal(e)
        })
    }

}