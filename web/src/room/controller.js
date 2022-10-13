export default class RoomController {

    constructor(room, roomView, userController, closeRoom) {
        this.model = room
        this.view = roomView
        this.user = userController
        this.monitorRoomSocket()
        this.displayHistory()
        this.closeRoom = closeRoom
    }

    monitorRoomSocket = () => {
        this.model.monitorSocket(this.handleNewMessage)
    }


    displayHistory = () => {
        this.model.getMessages().then((msgs)=> {
            msgs.forEach((msg)=> {
                this.handleNewMessage(msg, false)
            })
        })
    }

    displayRoom = () => {
        this.view.display(this.model.getRoom(), this.handleSendMessageButtonClick, this.displayHistory,this.closeRoom)
    }

    handleNewMessage = (data, recent) => {
        if (data.user.id === this.user.getUser().id) {
            this.view.displayMsg(data, true, recent)
        } else {
            this.view.displayMsg(data, false, recent)
        }
    }

    handleSendMessageButtonClick = (msg) => {
        this.model.sendMessage(msg)
    }

    close = () => {
        this.model.closeSocket()
    }
}