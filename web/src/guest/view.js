import { createElement } from "../utils/utils.js"

export default class GuestView {
 

    constructor() {
         this.online = document.getElementById("online-users")   
         this.offline = document.getElementById("offline-users")   
    }

    display = ({status, user, newMessage}, handler) => {
        const guest = createElement("div", "chat-user")
        guest.textContent = user.nickname
        guest.addEventListener("click", (event)=> {
            handler()
        })
        if (status == "online") {
            this.online.append(guest)
        }else{
            this.offline.append(guest)
        }
        this.guest = guest
        if (newMessage) {
            this.makeGreen()
        }
    }

    makeGreen = () => {
        this.guest.classList.add("new-message")
    }

    makeGray = () => {
        this.guest.classList.remove("new-message") 
    }
}