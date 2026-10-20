import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { quiz } from "../utils/dummy";

const JoinQuiz = () => {
  const { quizNumber, slug } = useParams();

  const [timer, setTimer] = useState(true);
  const [time, setTime] = useState(3);
  const [playQuiz] = useState(quiz);
  const [quizId, setQuizId] = useState("");
  const [questionNo, setQuestionNo] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [finished, setFinished] = useState(false);

  const questionRef = useRef(null);

  const question = playQuiz.questions?.[questionNo];
  const totalQuestions = playQuiz.questions?.length || 0;

  // Countdown timer
  useEffect(() => {
    if (!timer) return;

    if (time <= 0) {
      localStorage.setItem(
        "quiz_id",
        String(playQuiz.quizNumber ?? quizNumber),
      );
      setTimer(false);
      return;
    }

    const timeout = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer, time, playQuiz.quizNumber, quizNumber]);

  // Read quiz ID
  useEffect(() => {
    if (timer) return;

    const id = localStorage.getItem("quiz_id");
    if (id) setQuizId(id);
  }, [timer]);

  // Animate each new question from right to center
  useEffect(() => {
    if (timer || finished || !questionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        questionRef.current,
        {
          x: 1000,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          onComplete: () => setAnimating(false),
        },
      );
    }, questionRef);

    return () => ctx.revert();
  }, [questionNo, timer, finished]);

  // Select option and slide question to the left
  const handleOptionSelect = (option) => {
    if (animating || !question || finished) return;

    setSelectedOption(option.optionId);
    setAnimating(true);

    gsap.to(questionRef.current, {
      x: -1000,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        const nextQuestion = questionNo + 1;

        if (nextQuestion < totalQuestions) {
          setSelectedOption(null);
          setQuestionNo(nextQuestion);
        } else {
          setFinished(true);
          setAnimating(false);
        }
      },
    });
  };

  // Seconds ko MM:SS format mein convert karna
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const [seconds, setSeconds] = useState(Number(quiz.duration + 3));

  useEffect(() => {
    if (seconds <= 0) {
      setFinished(true);
      setAnimating(false);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Countdown screen
  if (timer) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#1D0049] p-4">
        <div className="relative flex h-50 w-50 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/20 border-t-amber-400" />
          <div className="absolute inset-3 rounded-full bg-indigo-500/30" />
          <span className="relative text-7xl font-bold text-white">{time}</span>
        </div>

        <span className="mt-8 text-4xl font-bold tracking-wide text-amber-400">
          Ready
        </span>

        <p className="mt-2 text-sm font-bold text-white">
          Get ready for your quiz...
        </p>
      </div>
    );
  }

  // Quiz completion screen
  if (finished) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#1D0049] p-4 text-center">
        <div className="rounded-3xl border border-purple-400/30 bg-purple-500/10 p-10 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
          <div className="text-6xl">🏆</div>
          <h1 className="mt-5 text-4xl font-black text-white">
            Quiz Completed!
          </h1>
          <p className="mt-3 text-purple-200/70">
            Great job! You have completed all the questions.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-500 px-6 py-3 font-bold text-white transition hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#1D0049] p-4">
      <div className="relative mx-auto w-full max-w-4xl min-h-[95vh] overflow-hidden rounded-2xl  bg-linear-to-br from-[#21064D] via-[#160A35] to-[#080817] p-6 shadow-[0_0_35px_rgba(139,92,246,0.15)] sm:p-8">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Quiz Header */}
        <div className="relative flex flex-col gap-6 border-b-2 border-purple-500/20 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400 shadow-[0_0_10px_#E879F9]" />
                {playQuiz.category}
              </span>
              <span className="inline-flex items-center gap-2 sm:hidden rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                {formatTime(seconds)} min.
              </span>
            </div>

            <h1 className="mt-5 bg-linear-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
              {playQuiz.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-purple-200/70 sm:text-base">
              {playQuiz.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90">
                <span className="text-purple-300">◈</span>
                {playQuiz.language}
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90">
                <span className="text-fuchsia-300">✦</span>
                {playQuiz.difficulty}
              </span>
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-center sm:flex sm:pl-6">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-purple-400/40 bg-linear-to-br from-purple-500/20 to-fuchsia-500/10 shadow-[0_0_25px_rgba(168,85,247,0.15)] sm:h-32 sm:w-32">
              <div className="absolute inset-2 rounded-xl border border-purple-300/10" />
              <div className="text-center">
                <div className="text-xl text-fuchsia-300">Time</div>
                <p className="text-lg">{formatTime(seconds)} min.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Progress */}
        <div className="relative mt-6">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span className="text-purple-200">
              QUESTION {questionNo + 1} / {totalQuestions}
            </span>
            <span className="text-fuchsia-300">
              {totalQuestions
                ? Math.round(((questionNo + 1) / totalQuestions) * 100)
                : 0}
              %
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-purple-500 to-fuchsia-400 transition-all duration-500"
              style={{
                width: `${
                  totalQuestions ? ((questionNo + 1) / totalQuestions) * 100 : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Animated Question Area */}
        <div ref={questionRef} className="relative mt-8">
          {question ? (
            <>
              <h2 className="flex items-start gap-3 text-lg font-bold leading-8 text-yellow-300 sm:text-xl">
                <span className="shrink-0 rounded-lg border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-white">
                  Q.{questionNo + 1}
                </span>
                <span>{question.question}</span>
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3">
                {question.options?.map((option, index) => {
                  const isSelected = selectedOption === option.optionId;

                  return (
                    <button
                      key={option.optionId ?? index}
                      type="button"
                      disabled={animating}
                      onClick={() => handleOptionSelect(option)}
                      className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors duration-200 ${
                        isSelected
                          ? "border-fuchsia-400 bg-fuchsia-500/30 shadow-[0_0_20px_rgba(217,70,239,0.2)]"
                          : "border-purple-500/30 bg-indigo-700/20 hover:border-fuchsia-400/60 hover:bg-indigo-400/20"
                      } ${animating ? "cursor-wait" : "cursor-pointer"}`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-bold ${
                          isSelected
                            ? "border-fuchsia-300 bg-fuchsia-500 text-white"
                            : "border-purple-300/50 bg-purple-500/10 text-purple-100"
                        }`}
                      >
                        {option.optionId ?? String.fromCharCode(65 + index)}
                      </span>

                      <span className="text-base font-semibold text-white sm:text-lg">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="py-10 text-center font-semibold text-purple-200">
              No questions available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;
