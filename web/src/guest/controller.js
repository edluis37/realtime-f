
export default class GuestController {
   
    constructor(guest, guestView, createRoom) {
        this.model = guest
        this.view = guestView
        this.createRoom = createRoom
    }

    display = () => {
        this.view.display(this.model.getGuest(), this.guestClickHandler)
    }

    guestClickHandler = () => {
        this.view.makeGray()
        this.model.setNewMessage(false)
        let g = this.model.getGuest()
        this.model.getRoom().then(room => {
            this.model.setRoom(room)
            this.createRoom(this.model.room)
        })
    }

    getId = () => {
        return this.model.getGuest().user.id
    }

    update = ({ user, last_message, status, new_message }) => {
        // console.log(user, lastMessage, status)
        if (last_message !== undefined && last_message !== null) {
            this.model.setLastMessage(last_message)
        }

        if (status !== undefined && status !== null && status !== "") {
            this.model.setStatus(status)
        }

        if (new_message) {
            this.model.setNewMessage(new_message)
        }
    }
}