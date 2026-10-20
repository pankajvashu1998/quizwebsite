import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuArrowRight, LuBookOpen } from "react-icons/lu";
import { quizTopics } from "../utils/topics";

const MockTest = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  // Group topics by category
  const groupedTopics = quizTopics.reduce((groups, topic) => {
    if (!groups[topic.category]) {
      groups[topic.category] = [];
    }

    groups[topic.category].push(topic);
    return groups;
  }, {});

  const categories = Object.keys(groupedTopics);

  // Scroll a category horizontally
  const scrollSection = (category, direction) => {
    const container = sectionRefs.current[category];

    if (container) {
      container.scrollBy({
        left: direction * Math.min(container.clientWidth * 0.8, 600),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-[#1D0049] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Explore Mock Tests
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
              Choose your subject, practice important topics, and prepare
              smarter for your next exam.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border-2 border-purple-700/40 bg-slate-900/20 px-4 py-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-cyan-400">
              <LuBookOpen size={21} />
            </div>

            <div>
              <p className="text-xl font-bold">{quizTopics.length}</p>
              <p className="text-xs text-slate-400">Available Topics</p>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-10">
          {categories.map((category) => {
            const topics = groupedTopics[category];

            return (
              <section key={category}>
                {/* Category Header */}
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold sm:text-xl">
                        {category}
                      </h2>

                      <span className="rounded-md border-2 border-white/20 px-2 py-1 text-xs font-medium text-amber-500">
                        {topics.length} Topics
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-300">
                      Practice {category.toLowerCase()} questions
                    </p>
                  </div>

                  {/* Desktop Navigation Buttons */}
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <button
                      type="button"
                      aria-label={`Scroll ${category} left`}
                      onClick={() => scrollSection(category, -1)}
                      className="flex size-10 items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95"
                    >
                      <LuArrowLeft size={18} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Scroll ${category} right`}
                      onClick={() => scrollSection(category, 1)}
                      className="flex size-10 items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95"
                    >
                      <LuArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll Cards */}
                <div
                  ref={(element) => {
                    sectionRefs.current[category] = element;
                  }}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                  {topics.map((topic) => (
                    <article
                      onClick={() => navigate(`/quizzes/${topic.slug}`)}
                      key={topic.id}
                      className="group w-65 cursor-pointer shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-slate-800 bg-white transition duration-300 hover:-translate-y-1 hover:border-purple-950 hover:shadow-2xl hover:shadow-purple-950/20 sm:w-70"
                    >
                      {/* Image */}
                      <div className="relative h-45 overflow-hidden bg-slate-800">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/10 to-transparent" />
                      </div>

                      {/* Card Content */}
                      <div className="p-4">
                        <div className="mb-4 flex items-center justify-between gap-2 text-xs text-slate-400">
                          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-purple-950">
                            {topic.title}
                          </h3>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Mobile Navigation Buttons */}
                <div className="mt-1 flex justify-end gap-2 sm:hidden">
                  <button
                    type="button"
                    aria-label={`Scroll ${category} left`}
                    onClick={() => scrollSection(category, -1)}
                    className="flex size-10 items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900 text-slate-300 active:scale-95"
                  >
                    <LuArrowLeft size={18} />
                  </button>

                  <button
                    type="button"
                    aria-label={`Scroll ${category} right`}
                    onClick={() => scrollSection(category, 1)}
                    className="flex size-10 items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900 text-slate-300 active:scale-95"
                  >
                    <LuArrowRight size={18} />
                  </button>
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 border-t-2 border-purple-800/30 pt-5 text-center">
          <p className="text-xs text-slate-300 font-semibold">
            Keep practicing. Every attempt brings you closer to your goal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
