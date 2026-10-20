import React, { useEffect, useRef, useState } from "react";
import {
  LuBot,
  LuUpload,
  LuImage,
  LuX,
  LuPlus,
  LuSparkles,
  LuZap,
  LuGamepad2,
  LuFileImage,
  LuCheck,
} from "react-icons/lu";

const AI = () => {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const imagesRef = useRef(images);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  const addImages = (files) => {
    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageUpload = (e) => {
    addImages(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addImages(e.dataTransfer.files);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const image = prev.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const removeAllImages = () => {
    setImages((prev) => {
      prev.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });

      return [];
    });
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    console.log(
      "Selected images:",
      images.map((image) => image.file),
    );
    console.log("FormData:", [...formData.entries()]);

    // Connect your backend API here.
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-y-auto bg-[#1D0049] text-white selection:bg-purple-500/30">
      {/* Header */}
      <header className="relative z-10 flex shrink-0 items-center justify-between  bg-[#1D0049] px-4 py-4.5 backdrop-blur-xl sm:px-9">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded border-2 border-purple-400/20 bg-linear-to-br from-purple-500/20 to-violet-700/10 shadow-[0_0_25px_rgba(139,92,246,0.10)]">
            <LuBot className="text-purple-300" size={25} />
          </div>

          <div>
            <h2 className="font-bold tracking-tight">AI Tutor</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded border-2 border-emerald-400/15 bg-emerald-400/6 px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-bold text-emerald-300">
            Ready to play
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 p-4">
        {/* Hero */}
        <section className="relative bg-white/5  overflow-hidden rounded-2xl border-2 border-purple-400/15  p-5 sm:p-8 lg:p-9">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-purple-400/20 bg-purple-400/8 px-3 py-1.5">
              <LuSparkles size={14} className="text-purple-300" />
              <span className="text-[10px] font-bold tracking-[0.17em] text-purple-200 sm:text-xs">
                AI-POWERED QUIZ ARENA
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ">
              Turn Knowledge Into{" "}
              <span className="bg-linear-to-r from-purple-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Victory.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl  font-bold text-sm leading-7 text-gray-300 sm:text-base">
              Create interactive MCQ quizzes, challenge your knowledge, and
              level up your learning with every attempt.
            </p>

            <div className="mt-6 font-semibold flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-gray-300">
              <span className="flex items-center gap-2">
                <LuZap size={15} className="text-purple-300" />
                Smart practice
              </span>
              <span className="flex items-center gap-2">
                <LuGamepad2 size={16} className="text-purple-300" />
                Interactive quizzes
              </span>
              <span className="flex items-center gap-2">
                <LuCheck size={15} className="text-purple-300" />
                Learn at your pace
              </span>
            </div>
          </div>
        </section>

        {/* Upload heading */}
        <section className="mb-5 flex flex-wrap items-center justify-between gap-4">
          {/* <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-purple-400">
              YOUR NEXT CHALLENGE
            </p>

            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Quiz Studio
            </h2>

            <p className="mt-1.5 text-sm text-gray-500">
              Bring your questions. Get ready to play.
            </p>
          </div> */}

          {images.length > 0 && (
            <div className="flex items-center gap-2 rounded-lg mt-2 border-2 border-white/8 bg-white/3 px-3 py-2">
              <LuFileImage size={16} className="text-purple-300" />
              <span className="text-sm font-semibold">{images.length}</span>
              <span className="text-xs text-gray-300 font-bold">
                {images.length === 1 ? "image selected" : "images selected"}
              </span>
            </div>
          )}
        </section>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Upload area */}
        <section className="overflow-hidden rounded-2xl border-2 border-white/8 bg-white/5 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between border-b-2 border-white/7 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                <LuImage size={18} className="text-purple-300" />
              </div>

              <div>
                <h3 className="text-sm font-bold sm:text-base">
                  Upload Question Images
                </h3>
                <p className="mt-0.5 text-[11px] text-gray-400 font-bold">
                  Add your MCQ question images to get started
                </p>
              </div>
            </div>

            {images.length > 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg border-2 border-purple-400/20 bg-purple-500/8 px-3 py-2 text-xs font-semibold text-purple-200 transition hover:border-purple-400/40 hover:bg-purple-500/15"
              >
                <LuPlus size={15} />
                <span className="hidden sm:inline">Add images</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {images.length === 0 ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setDragging(false);
                  }
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Choose or drop question images"
                className={`group relative flex min-h-70 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed px-5 py-10 text-center transition-all duration-300 sm:min-h- ${
                  dragging
                    ? "border-purple-400 bg-purple-500/10 shadow-[inset_0_0_40px_rgba(168,85,247,0.08)]"
                    : "border-white/[0.14] bg-[#0b0a13] hover:border-purple-400/50 hover:bg-purple-500/2.5"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(168,85,247,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.25)_1px,transparent_1px)] bg-size:32px_32px" />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-purple-500/[0.07] to-transparent" />

                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-purple-400/20 bg-linear-to-br from-purple-500/15 to-violet-700/5 shadow-[0_0_35px_rgba(139,92,246,0.10)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.20)]">
                  <LuUpload size={31} className="text-purple-300" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-purple-400/20 bg-[#171025] text-purple-200">
                    <LuPlus size={15} />
                  </span>
                </div>

                <h3 className="relative text-base font-bold sm:text-lg">
                  {dragging ? "Drop your images here" : "Enter the Quiz Arena"}
                </h3>

                <p className="relative mt-2 max-w-sm text-xs leading-6 text-gray-300 sm:text-sm">
                  Drag and drop your MCQ question images here, or browse your
                  device to select files.
                </p>

                <div className="inline-flex items-center justify-center my-5 cursor-pointer rounded-[10px] border-0 bg-[#8914ef] font-bold px-10 py-4 text-[15px] tracking-[1.5px] text-white no-underline shadow-[0_10px_0_0_rgb(120,46,70)] transition-all duration-300 ease-in-out hover:shadow-[0_7px_0_0_rgb(201,46,70)] active:translate-y-1.5 active:shadow-none active:duration-200">
                  <LuPlus size={17} />
                  Choose Images
                </div>

                <div className="relative mt-5 flex flex-wrap justify-center gap-2">
                  {["JPG", "PNG", "WEBP"].map((format) => (
                    <span
                      key={format}
                      className="rounded-md border-2 border-white/7 bg-white/2.5 px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-500"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold">Selected Images</h3>
                    <p className="mt-1 text-xs text-gray-300">
                      Review your files before continuing.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeAllImages}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-400 transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className="group overflow-hidden rounded-xl border-2 border-white/9 bg-[#0b0a13] transition duration-300 hover:border-purple-400/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.07)]"
                    >
                      <div className="relative overflow-hidden bg-black/30">
                        <img
                          src={image.preview}
                          alt={`Question image ${index + 1}`}
                          className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40"
                        />

                        <div className="absolute left-2 top-2 rounded-md border-2 border-white/10 bg-black/70 px-2 py-1 text-[10px] font-bold text-purple-200 backdrop-blur-md">
                          IMAGE {String(index + 1).padStart(2, "0")}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          aria-label={`Remove ${image.file.name}`}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-white/10 bg-black/75 text-white backdrop-blur-md transition hover:border-red-400/30 hover:bg-red-500/90"
                        >
                          <LuX size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-3">
                        <LuFileImage
                          size={16}
                          className="shrink-0 text-purple-300"
                        />

                        <span className="truncate text-xs font-medium text-gray-300">
                          {image.file.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 border-t-2 border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={removeAllImages}
                    className="inline-flex items-center justify-center my-5 cursor-pointer rounded-[10px] border-0 bg-[#8914ef] font-bold px-10 py-4 text-[12px] tracking-[1.5px] text-white no-underline shadow-[0_10px_0_0_rgb(120,146,170)] transition-all duration-300 ease-in-out hover:shadow-[0_7px_0_0_rgb(201,46,70)] active:translate-y-1.5 active:shadow-none active:duration-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleUpload}
                    className="inline-flex items-center justify-center my-5 cursor-pointer rounded-[10px] border-0 bg-[#8914ef] font-bold px-10 py-4 text-[12px] tracking-[1.5px] text-white no-underline shadow-[0_10px_0_0_rgb(120,146,170)] transition-all duration-300 ease-in-out hover:shadow-[0_7px_0_0_rgb(201,46,70)] active:translate-y-1.5 active:shadow-none active:duration-200"
                  >
                    <LuUpload size={18} />
                    Generate My Quiz
                    <LuSparkles size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AI;
