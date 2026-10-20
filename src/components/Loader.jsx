import React from "react";
import { TbLoader2 } from "react-icons/tb";
const Loader = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-50 h-50 animate-spin  flex items-center justify-center">
        <TbLoader2 className="text-6xl text-white " />
      </div>
    </div>
  );
};

export default Loader;
