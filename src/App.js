import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import Spinner from "./components/Spinner";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import NewProject from "./components/NewProject";

const App = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        console.log(userCredential.providerData[0]);
        setDoc(
          doc(db, "users", userCredential.uid),
          userCredential?.providerData[0]
        ).then(() => {
          //dispatch the action to store
          dispatch(SET_USER(userCredential?.providerData[0]))
          navigate("/home/projects", { replace: true });
        });
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    //cleanup the listner event
    return () => unSubscribe();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />
            {/* IF THE ROUTE NOT MATCHING */}

            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
