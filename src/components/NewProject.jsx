import React, { useState , useEffect } from "react";
import { FaHtml5, FaChevronDown, FaCss3, FaJs } from "react-icons/fa";
import SplitPane from "react-split-pane";
import { FcSettings } from "react-icons/fc";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [outPut, setOutPut] = useState("");

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
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* alert */}
        {/* header section */}

        {/* coding section */}

        <div>
          {/* horizontal section  */}

          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* top coding section */}
            <SplitPane split="vertical" minSize={500}>
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
              <SplitPane split="vertical" minSize={500}>
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