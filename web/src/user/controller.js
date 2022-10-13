
export default class UserController {
    constructor(userModel, userView, mainUpdate) {
        this.model = userModel
        this.view = userView
        this.mainUpdate = mainUpdate
        this.view.bindSubmitLoginInfo(this.handleSubmitLoginInfo)
        this.view.bindSubmitSignUpInfo(this.handleSubmitSignUpInfo)
    }

    getUser = () => {
        return this.model.getUser()
    }

    createUserInfo = () => {
        let user = this.model.getUser()
        if (user.isLoggedIn) {
            
            this.view.displayUserInfo(user)
        }else {
            this.view.clearUserInfo()
        }
    }

    createVisitorButtons = () => {
        let user = this.model.getUser()
        if (user.isLoggedIn) {
            this.view.createLogOutButton(this.handleLogOutClick)
        } else {
            this.view.createSignButtons(this.handleSubmitLoginInfo, this.handleSubmitSignUpInfo)
        }
    }

    handleSubmitSignUpInfo = (userInfo) => { 
        this.model.signup(userInfo).then((user)=> {
            this.model.setUser(user)
            this.view.closeModal()
            this.mainUpdate()
        })
    }

    handleLogOutClick = () => {
        this.model.logout().then(() => {
            this.model.resetUser()
            this.mainUpdate()
        })
    }

    handleSubmitLoginInfo = (credentials) => {
  
        this.model.login(credentials).then((user) => {
            this.model.setUser(user)
            this.view.closeModal()
            this.mainUpdate()
        })
    }
}