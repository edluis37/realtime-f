
import { createElement } from '../utils/utils.js'

export default class PostView {
    constructor() {
        this.postsContainer = document.getElementById("posts-container")
    }

    displayPost = (post, newCommentHandler) => {
        const postWrapper = createElement("div", "post-wrapper")
        postWrapper.append(
            this.displayPostContainer(post,newCommentHandler),
            this.addCommentSection()
        )
        this.postsContainer.append(postWrapper)
    }

    displayPostContainer = ({ title, text, author, nComments }, newCommentHandler) => {
        const container = createElement("div", "post-container")
        this.postContainer = container
        const content = createElement("div", "post-content")
        content.append(
            this.displayTitle(title),
            this.displayText(text),
            this.displayNewComment(newCommentHandler),
            this.displayCommentsCount(nComments)
        )

        const additional = createElement("div", "additional")
        additional.append(
            this.displayAuthorCard(author),
            this.displayAuthorDetailed(author)
        )

        container.append(additional, content)
        return container
    }

    displayNewComment = (newCommentHandler) => {
        const wrapper = createElement("div", "new-comment-wrapper")
        const input = createElement("input", "new-comment-input")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "leave a comment")
        const sendButton = createElement("button", "new-comment-button")
        sendButton.textContent = "Send"

        sendButton.addEventListener("click", (event) => {
            newCommentHandler(input.value,this.commentSection.style.display)
            input.value = ""
        })
        wrapper.append(input, sendButton)
        return wrapper
    }

    displayTitle = (title) => {
        const wrapper = createElement("h1", "post-title")
        const span = createElement("span", "post-title-span")
        span.textContent = title
        wrapper.append(span)

        return wrapper
    }
        //card
    displayAuthorCard = (author) => {
        const authorCard = createElement("div", "author-card")
        const emailSpan = createElement("div", "author-nickname", "center")
        emailSpan.textContent = `01 RTFORUM`
        const nickname = createElement("div", "author-nickname", "right")
        nickname.textContent = `User: ${author.nickname}`
        const age = createElement("div", "author-age", "center")
        age.textContent = `Gender: ${author.gender}`
        const policy = createElement("div", "author-policy", "center")
        policy.innerHTML = `<h1>COMMUNITY<BR/>LIFE<BR/>RESPECT</h1>`
        
        authorCard.append(nickname, age, policy, emailSpan)
        return authorCard
    }

    displayAuthorDetailed = (author) => {
        console.log(author)
        //detailed
        const detailedInfo = createElement("div", "detailed-info")

        const fullname = createElement("h1")
        fullname.textContent = `${author.first_name} ${author.last_name}`

        const email = createElement("div", "info")
        const emailSpan = createElement("span")
        emailSpan.textContent = `Email: ${author.email}`
        email.append(emailSpan)

        const sex = createElement("div", "info")
        const sexSpan = createElement("span")
        sexSpan.textContent = `Gender: ${author.gender}`
        sex.append(sexSpan)

        detailedInfo.append(fullname, email, sex)
        return detailedInfo
    }

    displayText = (text) => {
        const wrapper = createElement("p", "post-text")
        const span = createElement("span", "post-text-span")
        span.textContent = text
        wrapper.append(span)
        return wrapper
    }

    displayCommentsCount = (n) => {
        const wrapper = createElement("div", "comment-count")
        const span = createElement("span", "comment-count-span")
        span.textContent = `${n} comments`
        wrapper.append(span)
        this.commentCount = wrapper
        return wrapper
    }


    bindCommentCount = (handler) => {
        this.commentCount.addEventListener("click", (event) => {
            handler(this.commentSection.style.display)
        })
    }


    addCommentSection = () => {
        const commentSection = createElement("div", "comment-section")
        commentSection.style.display = "none"
        this.commentSection = commentSection
        return commentSection
    }


    displayCommentSection = () => {
        this.commentSection.innerHTML = ""
        this.commentSection.style.display = "block"
    }

    closeCommentSection = () => {
        this.commentSection.style.display = "none"
        this.commentSection.innerHTML = ""
    }

    clearCommentSection = () => {
        this.commentSection.innerHTML = ""
    }
}