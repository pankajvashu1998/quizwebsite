import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <Link to={"/user/dashboard/mock-tests"} className="p-5 text-2xl">Quiz</Link>
    </div>
  );
};

export default Home;
