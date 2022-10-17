import { createElement, displayModal, validateNickname, validateEmail, validateName } from '../utils/utils.js'


export default class UserView {
    constructor() {

        this.signButtons = document.getElementById("sign-buttons")
        this.userInfo = document.getElementById("user-info")
    }

    displayUserInfo = ({ nickname, email, firstName, lastName, age, gender }) => {
        this.userInfo.append(
            this.createUserInfoField("Nickname", nickname),
            this.createUserInfoField("Email", email),
            this.createUserInfoField("Fullname", `${firstName} ${lastName}`),
            this.createUserInfoField("Age", age),
            this.createUserInfoField("Gender", gender),
        )
    }

    clearUserInfo = () => {
        this.userInfo.innerHTML = ""
    }

    createUserInfoField = (name, value) => {
        let userInfoField = createElement("div")
        userInfoField.innerHTML = `${name}: <strong>${value}</strong>`
        return userInfoField
    }

    bindSubmitLoginInfo
    bindSubmitSignUpInfo


    createSignButtons = () => {
        this.signButtons.innerHTML = ""
        this.signButtons.append(
            this.createLogInButton(),
            this.createSignUpButton()
        )
    }

    createLogInButton = () => {
        const button = createElement("button", "visitor-button", "gray")
        button.id = "sign-in-button"
        button.textContent = "Log In"

        button.addEventListener("click", () => {
            this.showLoginModal()
        })
        return button
    }

    createSignUpButton = () => {
        const button = createElement("button", "visitor-button")
        button.id = "sign-up-button"
        button.textContent = "Sign Up"

        button.addEventListener("click", () => {
            this.showSignUpModal()
        })
        return button
    }




    showLoginModal = () => {
        const modal = document.getElementById("login-modal")
        modal.style.display = "block"
        this.bindCloseModal(modal)
        this.modal = modal
    }

    bindSubmitLoginInfo = (handler) => {
        const modal = document.getElementById("login-modal")
        const submitButton = modal.querySelector("button")
        submitButton.addEventListener("click", () => {
            let username = modal.querySelector('input[name="username"]').value
            let password = modal.querySelector('input[name="password"]').value
            let creds = {
                creds: username,
                password: password,
            }
            handler(creds)
        })
    }
    showSignUpModal = () => {
        const modal = document.getElementById("signup-modal")
        modal.style.display = "block"
        this.bindCloseModal(modal)
        this.modal = modal
    }

    bindSubmitSignUpInfo = (handler) => {
        const modal = document.getElementById("signup-modal")
        const submitButton = modal.querySelector("button")
        submitButton.addEventListener("click", () => {
            let password = modal.querySelector('input[name="password"]').value
            let rPassword = modal.querySelector('input[name="repeat-password"]').value
            if (password !== rPassword) {
                displayModal("Passwords do not match")
                return
            }
            let info = {
                nickname: modal.querySelector('input[name="username"]').value,
                password: modal.querySelector('input[name="password"]').value,
                email: modal.querySelector('input[name="email"]').value,
                first_name: modal.querySelector('input[name="first-name"]').value,
                last_name: modal.querySelector('input[name="last-name"]').value,
                age: parseInt(modal.querySelector('input[name="age"]').value),
                gender: modal.querySelector('select[name="gender"]').value,
            }

            let correctNickname = validateNickname(info.nickname)
            console.log(correctNickname)
            if (!correctNickname) {
                displayModal("Incorrect nickname, nickname should have only latin symbols, with min 5 and max 20 symbols")
                return 
            }
            let correctEmail = validateEmail(info.email)
            if (!correctEmail) {
                displayModal("Incorrect email")
                return 
            }
            let correctFirstName = validateName(info.first_name)
            if (!correctFirstName) {
                displayModal("Incorrect first name")
                return 
            }
            let correctLastName = validateName(info.last_name)
            if (!correctLastName) {
                displayModal("Incorrect last name")
                return 
            }
            
            handler(info)
        })
    }

    bindCloseModal = (modal) => {
        modal.querySelector(".close").addEventListener("click", () => {
            this.closeModal(modal)
        })
    }

    closeModal(modal) {
        if (modal === undefined || modal === null) {
            modal = this.modal
        }
        modal.style.display = "none"
    }

    createLogOutButton = (logOutHandler) => {
        this.signButtons.innerHTML = ""
        const button = createElement("button", "visitor-button")
        button.id = "log-out-button"
        button.textContent = "Sign Out"

        button.addEventListener(("click"), () => {
            logOutHandler()
        })

        this.signButtons.append(
            button
        )
    }


}