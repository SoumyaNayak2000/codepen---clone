import React, { useState } from "react";
import UserAuthInput from "./auth/UserAuthInput";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGitHub, signInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

import logo from "../assets/codepen-logo-png-transparent.png"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidation, setGetEmailValidation] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const createUser = async () => {
    if (getEmailValidation) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential) {
            console.log(userCredential);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPass = async () => {
    if (getEmailValidation) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential) {
            console.log(userCredential);
          }
        })
        .catch((err) => {
          console.log(err.message)
          if(err.message.includes("user-not-found")){
            setAlert(true)
            setAlertMessage("Invalid Id: User not found")
          }else if(err.message.includes("wrong-password")){
            setAlert(true)
            setAlertMessage("Invalid Password!")
          }else{
            setAlert(true)
            setAlertMessage("Temporary disabled due to many faild attempts !")
          }

          setInterval(() => {
            setAlert(false)
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full py-6">
      <img
        src={logo}
        className="object-contain w-32 h-auto bg-transparent"
      />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText ">Join With Us! 😊</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStatefunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidation={setGetEmailValidation}
          />
          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass="true"
            key="Password"
            setStatefunction={setPassword}
            Icon={MdPassword}
          />
          {/* alert section */}

          <AnimatePresence>
            {alert && (
              <motion.p
              key={"Alertmessage"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500"
              >
                {alertMessage}
              </motion.p>
            )
            }
          </AnimatePresence>

          {/* login button */}
          {!isLogin ? (
            <motion.div
              onClick={createUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl  hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPass}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl  hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          )}

          {/* account text section */}

          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an Account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't Have an Account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                SignUp Here
              </span>
            </p>
          )}

          {/* or section */}

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)] ">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* sign in with google */}

          <motion.div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in With Google</p>
          </motion.div>

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)] ">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* signin with github */}
          <motion.div
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-3xl" />
            <p className="text-xl text-white">Sign in With GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
