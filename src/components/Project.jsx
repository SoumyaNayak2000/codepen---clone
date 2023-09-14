import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { useSelector } from "react-redux";

const Project = () => {
  const [filtered, setFiltered] = useState(null);
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );

  useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowercaseTerm = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => lowercaseTerm.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm]);
  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5 , delay:index*0.5}}
      key={index}
      className="w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4"
    >
      <div
        className="bg-primary overflow-hidden w-full h-full rounded-md"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          title="Result"
          srcDoc={project.outPut}
          style={{ border: "none", height: "100%", width: "100%" }}
        ></iframe>
      </div>

      <div className="flex items-center justify-start gap-3 w-full">
        {/* image */}
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.user?.photoURL ? (
            <>
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={project?.user?.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              ></motion.img>
            </>
          ) : (
            <>
              <p className="text-xl font-semibold capitalize">
                {project?.user?.email[0]}
              </p>
            </>
          )}
        </div>
        {/* name */}
        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>

        {/* collections */}
        <motion.div
          className="cursor-pointer ml-auto"
          whileTap={{ scale: 0.9 }}
        >
          <MdBookmarkBorder className="text-primaryText text-3xl" />
          <MdBookmark className="text-primaryText text-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Project;
