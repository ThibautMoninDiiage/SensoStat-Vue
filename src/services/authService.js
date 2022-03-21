export default class AuthService {

    getTokenFromLocalStorage() {
        return localStorage.getItem('token')
    }

    setTokenToLocalStorage(token){
        localStorage.setItem('token', token)
    }

}
