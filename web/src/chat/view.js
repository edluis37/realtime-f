import { createElement } from "../utils/utils.js"

export default class ChatView {
   
    constructor () {
        this.online = document.getElementById("online-users")   
        this.offline = document.getElementById("offline-users") 
    }

    clearChat = () => {
        this.offline.innerHTML = "" 
        this.online.innerHTML = ""
    }

    addHeaders = () => {
        this.online.append(this.createHeader("online"))
        this.offline.append(this.createHeader("offline"))
    }

    createHeader = (status) => {
        const el = createElement("p", "header")
        el.textContent = status
        return el
    }
}