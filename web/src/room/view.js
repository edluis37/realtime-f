
import { createElement, formatDate } from '../utils/utils.js'

export default class RoomView {
    

    constructor() {
        this.roomContainer = document.getElementById("room-container")

    }


    display = ({ id }, sendMessageHandler, getOldMessages, closeRoom) => {
        const room = createElement("div", "room")
        room.id = `room-${id}`
        const close = createElement("div", "imgcontainer")
        const closeSpan = createElement("span", "close")
        closeSpan.innerHTML = `&times`
        closeSpan.addEventListener("click", (event) => {
            closeRoom()
        })
        close.append(closeSpan)

        const msgHistory = createElement("div", "msg-history")
        this.msgHistory = msgHistory
        msgHistory.addEventListener('scroll', (event) => {
            console.log(event)
            if (msgHistory.scrollTop == 0 ) {
                getOldMessages()
            }
        })
        const msgType = createElement("div", "type-msg")
        const inputMsgWrite = createElement("div", "input-msg-write")
        inputMsgWrite.append(
            this.createMsgInput(),
            this.createSendMsgButton(sendMessageHandler)
        )
        msgType.append(inputMsgWrite)
        room.append(close, msgHistory, msgType)
        this.roomContainer.append(
            room
        )
    }

    createMsgInput = () => {
        const input = createElement("input", "write-msg")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "Type a message")
        this.input = input
        return input
    }

    createSendMsgButton = (handler) => {
        const button = createElement("button", "msg-send-btn")
        button.setAttribute("type", "button")
        button.addEventListener("click", () => {
            if (this.input.value !== "") {
                handler(this.input.value)
                this.input.value = ""
            }
        })
        const image = createElement("i", "fa", "fa-paper-plane-o")
        image.setAttribute("aria-hidden", "true")
        button.append(image)
        return button
    }

    displayMsg = ({ text, timestamp, user }, self, recent) => {
        let msgWrapperClass, msgClass
        if (self) {
            msgWrapperClass = "outgoing_msg"
            msgClass = "sent_msg"
        } else {
            msgWrapperClass = "incoming_msg"
            msgClass = "received_msg"
        }
        const msgWrapper = createElement("div", msgWrapperClass)
        const msg = createElement("div", msgClass)
        if (self) {
            msg.append(
                this.createMsgTxt(text),
                this.createAdditionalInfo(timestamp, user)
            )
        } else {
            const incTxtWrapper = createElement("div", "received_withd_msg")

            incTxtWrapper.append(
                this.createMsgTxt(text),
                this.createAdditionalInfo(timestamp, user)
            )
            msg.append(
                incTxtWrapper
            )
        }


        msgWrapper.append(
            msg
        )

        if (recent) {
            this.msgHistory.append(
                msgWrapper
            )
        } else {
            this.msgHistory.prepend(
                msgWrapper
            )
        }

    }

    createMsgTxt = (text) => {
        const txt = createElement("p")
        txt.textContent = text
        return txt
    }

    createAdditionalInfo = (timestamp, user) => {
        const time = createElement("span", "time_date")
        time.textContent = `${formatDate(timestamp)} | ${user.nickname}`
        return time
    }
}