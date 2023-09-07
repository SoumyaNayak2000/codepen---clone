import {GithubAuthProvider, GoogleAuthProvider, signInWithRedirect} from "firebase/auth"
import {auth} from "../config/firebase.config"

const googleProvider = new GoogleAuthProvider()
const gitHubProvider=new GithubAuthProvider()



export const signInWithGoogle = async()=>{
    await signInWithRedirect(auth,googleProvider).then(userCredential=>{
        window.Location.reload()
    })
}

export const signInWithGitHub = async()=>{
    await signInWithRedirect(auth,gitHubProvider).then(userCredential=>{
        window.Location.reload()
    })
}