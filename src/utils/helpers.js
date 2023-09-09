import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import {v4 as uuidv4} from "uuid"

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCredential) => {
    window.Location.reload();
  });
};

export const signInWithGitHub = async () => {
  await signInWithRedirect(auth, gitHubProvider).then((userCredential) => {
    window.Location.reload();
  });
};

export const Menus = [
    {id:uuidv4(),name:"projects",uri:"home/projects"},
    {id:uuidv4(),name:"collections",uri:"home/collections"},
    {id:uuidv4(),name:"profile",uri:"home/profile"},

]
