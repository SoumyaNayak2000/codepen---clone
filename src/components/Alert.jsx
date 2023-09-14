import { motion } from "framer-motion";
import React from "react";

const Alert = ({ status, alertMsg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed top-24 right-12 z-10"
    >
      {status === "Success" && (
        <div className="px-4 py-2 rounded-md bg-emerald-500 shadow-md shadow-emerald-500 ">
          <p className="text-lg text-primary">{alertMsg}</p>
        </div>
      )}
      {status === "Warning" && (
        <div className="px-4 py-2 rounded-md bg-yellow-500 shadow-md shadow-yellow-500  ">
          <p className="text-lg text-primary">{alertMsg}</p>
        </div>
      )}
      {status === "Danger" && (
        <div className="px-4 py-2 rounded-md bg-red-500 shadow-md shadow-red-500 ">
          <p className="text-lg text-primary">{alertMsg}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
