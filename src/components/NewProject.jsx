import React, { useState, useEffect } from "react";
import { FaHtml5, FaChevronDown, FaCss3, FaJs, FaAngleDoubleRight } from "react-icons/fa";
import SplitPane from "react-split-pane";
import { FcSettings } from "react-icons/fc";
import { MdCheck, MdEdit } from "react-icons/md";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link } from "react-router-dom";
import logo from "../assets/codepen-logo-png-transparent.png";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

import UserProfileDetails from "./UserProfileDetails";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Alert from "./Alert";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [outPut, setOutPut] = useState("");
  const [title, setTitle] = useState("Untitle");
  const [isTitle, setIsTitle] = useState("");
  const [alert, setAlert] = useState(false)
  

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    updatedOutput();
  }, [html, css, js]);

  const updatedOutput = () => {
    const combinedOutput = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
          <script>${js}</script>
      </body>
    </html>`;

    setOutPut(combinedOutput);
  };

  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      outPut: outPut,
      user: user,
    };
    await setDoc(doc(db, "Projects" , id), _doc)
      .then((res) => {
        setAlert(true)

      })
      .catch((err) => {
        console.log(err);
      });

      setInterval(() => {
        setAlert(false)
      }, 2000);
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">

        {/* alert */}
        <AnimatePresence>
          {
            alert && <Alert status={"Success"} alertMsg={"Project saved successfully..."}/>
          }
        </AnimatePresence>
        {/* header section */}

        <header className="w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home"}>
              <img
                src={logo}
                className="object-contain w-32 h-auto"
                alt="logo"
              />
            </Link>

            <div className="flex flex-col items-start justify-start">
              {/* title */}
              <div className="flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.input
                        key={"titleInput"}
                        type="text"
                        placeholder="Your Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-3 py-2 rounded-md bg-transparent text-white"
                      />
                    </>
                  ) : (
                    <>
                      <motion.p
                        key={"titleLabel"}
                        className="px-3 py-2 text-white text-lg"
                      >
                        {title}
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.div
                        key={"MdCheck"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTitle(false)}
                      >
                        <MdCheck className="text-2xl text-emerald-500" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        key={"MdEdit"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTitle(true)}
                      >
                        <MdEdit className="text-2xl text-primaryText" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              {/* follow */}
              <div className="flex items-center justify-center px-3 mt-2 gap-2">
                <p className="text-primaryText text-sm">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer"
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>
          {/* user section */}
          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={saveProgram}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <UserProfileDetails />
            </div>
          )}
        </header>

        {/* coding section */}

        <div>
          {/* horizontal section  */}

          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"55%"}
          >
            {/* top coding section */}
            <SplitPane split="vertical" minSize={100}>
              {/* html code  */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="text-primaryText font-semibold">HTML</p>
                  </div>
                  {/* icons */}
                  <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-xl " />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                  />
                </div>
              </div>
              <SplitPane split="vertical" minSize={100}>
                {/* css code editor */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaCss3 className="text-xl text-sky-500" />
                      <p className="text-primaryText font-semibold">CSS</p>
                    </div>
                    {/* icons */}
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className="text-xl " />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={css}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }}
                    />
                  </div>
                </div>

                {/* js code editor */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaJs className="text-xl text-yellow-500" />
                      <p className="text-primaryText font-semibold">JS</p>
                    </div>
                    {/* icons */}
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className="text-xl " />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={js}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>
            {/* bottom result section */}
            <div className="bg-white overflow-hidden h-full">
              <iframe
                title="Result"
                srcDoc={outPut}
                style={{ border: "none", height: "100%", width: "100%" }}
              ></iframe>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
