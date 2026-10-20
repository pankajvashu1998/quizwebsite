import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaPlay, FaBolt, FaTrophy, FaArrowRight, FaStar } from "react-icons/fa";
import { quiz } from "../utils/dummy";
const Quizzes = () => {
  const { slug } = useParams();

  const difficulty = quiz.difficulty?.toLowerCase() || "medium";
  const navigate = useNavigate();
  console.log(quiz);

  const playQuiz = (quiz) => {
    navigate(`/join/${quiz.quizNumber}/${quiz.slug}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1D0049] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl">
        {/* Main Hero Card */}
        <div className="overflow-hidden rounded-3xl border-2 border-white/10 bg-indigo-500/20 shadow-2xl shadow-purple-950/30">
          <div className="">
            {/* Left Content */}
            <div className="flex relative flex-col justify-center px-10 pb-10">
              <div className="mx-auto w-100  ">
                <DotLottieReact src="/lottie/quiz.json" loop autoplay />
              </div>

              <h1 className="text-3xl text-yellow-300 font-black text-center leading-tight tracking-tight sm:text-5xl ">
                {quiz.title}
                <span className="mt-2 block text-white">Ready to Play?</span>
              </h1>

              <p className="mt-5 text-lg text-center max-w-3xl mx-auto leading-7 text-slate-400 font-semibold">
                Challenge yourself, test your knowledge, and climb the
                leaderboard. Every question brings you one step closer to
                becoming a champion.
              </p>

              {/* Stats */}
              <div className="mt-8 grid text-center grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border-2 border-white/8 bg-cyan-700/30 p-4 transition-colors hover:border-cyan-400/30">
                  <FaBolt className="mb-3 mx-auto text-4xl text-cyan-400" />
                  <p className="text-2xl font-black">{quiz.questions.length}</p>
                  <p className="mt-1 text-lg text-slate-300">Total Questions</p>
                </div>

                <div className="rounded-2xl border-2 border-white/8 bg-purple-700/30 p-4 transition-colors hover:border-purple-400/30">
                  <FaTrophy className="mb-3 mx-auto text-4xl text-purple-400" />
                  <p className="text-2xl font-black">
                    {quiz.totalMarks ?? quiz.questions.length}
                  </p>
                  <p className="mt-1 text-lg text-slate-300">Total Points</p>
                </div>

                <div className="col-span-2 rounded-2xl border-2 border-white/8 bg-amber-400/30 p-4 transition-colors hover:border-emerald-400/30 sm:col-span-1">
                  <FaStar className="mb-3 mx-auto text-4xl text-amber-400" />
                  <p className="text-2xl font-black capitalize">{difficulty}</p>
                  <p className="mt-1 text-lg text-slate-300">Challenge Mode</p>
                </div>
              </div>

              {/* Play Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => playQuiz(quiz)}
                  className="inline-flex font-bold items-center justify-center cursor-pointer rounded-[10px] border-0 bg-[#debb0d] px-10 py-4 text-[15px] tracking-[1.5px] text-black no-underline shadow-[0_10px_0_0_rgb(201,46,70)] transition-all duration-300 ease-in-out hover:shadow-[0_7px_0_0_rgb(201,46,70)] active:translate-y-1.5 active:shadow-none active:duration-200"
                >
                  <FaPlay className="mr-2 text-sm " /> PLAY NOW{" "}
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <section className="mt-20 sm:mt-26">
          <div className="mb-7 w-full flex flex-col justify-between gap-4 ">
            <div className="text-center ">
              <h2 className="text-3xl font-black sm:text-4xl">
                What's Inside the Quiz?
              </h2>

              <p className="mt-2 text-lg font-bold text-slate-300">
                Get a preview of the questions before you play.
              </p>
            </div>
          </div>

          <div className="bg-indigo-500/30 rounded-2xl p-8 border-2 border-purple-500/20 my-5">
            <div>
              <h2 className="text-lg font-bold pb-3 text-yellow-300">
                {quiz.description}
              </h2>
            </div>
            <div>
              {quiz.instructions.map((ins, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center border-2 border-purple-500/40 rounded-md">
                    {i + 1}
                  </span>
                  <p className="py-1.5 font-semibold ">{ins}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {quiz.questions.map((q, i) => (
              <div
                key={q._id || i}
                className="group rounded-2xl border-2 border-purple-700/30 bg-indigo-500/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/3 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-purple-400/20 bg-purple-500/10 text-sm font-black text-purple-300 transition-colors group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-300">
                      Question {i + 1}
                    </p>

                    <h3 className="mt-2 wrap-break-word text-sm font-semibold leading-7 text-slate-200 sm:text-base">
                      {q.question}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Quizzes;
