import React from "react";
import UserAuthInput from "./auth/UserAuthInput";

const SignUp = () => {
  return (
    <div className="w-full py-6">
      <img
        src="https://logos-download.com/wp-content/uploads/2019/07/Codepen_Logo.png"
        className="object-contain w-32 h-auto bg-gray-300"
      />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText ">Join With Us! 😊</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
            {/* email */}
            <UserAuthInput/>
            {/* password */}
            {/* alert section */}
            {/* login button */}
            {/* account text section */}
            {/* or section */}
            {/* sign in with google */}
            {/* or section */}
            {/* signin with github */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
