

export default class Chat {
    constructor() {
        this.wsUrl = "ws://"+location.host+"/chat"
    }


    connectToChatSocket = (newGuestHandler) => {
        const socket = new WebSocket(this.wsUrl)
        this.socket = socket
        socket.onmessage = (msg) => {
            let data = JSON.parse(msg.data)
            newGuestHandler(data)
        } 
    }

    closeChatSocket = () => {
        if (this.socket !== undefined) {
            this.socket.close()
        }
    }
}