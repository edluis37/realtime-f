import { displayModal } from "../utils/utils.js"

export default class Guest {
   
    constructor({ status, user, room, last_message, newMessage }) {
        this.status = status
        this.room = room
        this.user = user
        this.lastMessage = last_message
        this.getRoomUrl = "/room"
        this.newMessage = newMessage
    }

    getGuest = () => {
        return {
            status: this.status,
            room: this.room,
            user: this.user,
            lastMessage: this.lastMessage,
            newMessage: this.newMessage,
        }
    }

    haveMessages = () => {
        if (this.lastMessage !== undefined && this.lastMessage !== null) {
            return true
        } else {
            return false
        }
    }

    setLastMessage = (lastMessage) => {
        this.lastMessage = lastMessage

    }

    setStatus = (status) => {
        this.status = status
    }

    setRoom = (room) => {
        this.room = room
    }

    setNewMessage = (newMessage) => {
        this.newMessage = newMessage
    }


     getRoom = async () => {
        let room = await fetch(`${this.getRoomUrl}?guest_id=${this.user.id}`, {
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
            
            return json.room
        }).catch((e) => {
            displayModal(e)
        })
        return room
    }

 

}