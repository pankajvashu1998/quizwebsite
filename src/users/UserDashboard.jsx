import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  MdDashboard,
  MdMenuBook,
  MdOutlineQuiz,
  MdOutlineAnalytics,
  MdLogout,
} from "react-icons/md";
import { LuBot } from "react-icons/lu";
import Loader from "../components/Loader";

const dashboardTabs = [
  { tab: "Dashboard", icon: MdDashboard, path: "" },
  { tab: "My Learning", icon: MdMenuBook, path: "learning" },
  { tab: "AI Tutor", icon: LuBot, path: "ai-tutor" },
  { tab: "Mock Tests", icon: MdOutlineQuiz, path: "mock-tests" },
  { tab: "Performance", icon: MdOutlineAnalytics, path: "performance" },
];

const UserDashboard = () => {
  const [loader, setLoader] = useState(true);
  const [sideBar, setSidebar] = useState(false);

  if (!loader) {
    return <Loader />;
  }
  return (
    <div className="flex h-dvh w-full bg-[#1D0049]  overflow-hidden ">
      {/* Fixed Sidebar */}
      <aside
        onMouseEnter={() => setSidebar(true)}
        onMouseLeave={() => setSidebar(false)}
        className={`hidden h-full transition-all duration-100 ease-in-out  shrink-0 flex-col overflow-hidden border-r-2 border-white/10  md:flex `}
      >
        {/* Fixed Logo */}
        <div className="flex h-20  shadow shrink-0 items-center gap-3 border-b-2 border-white/10 px-6">
          {sideBar ? (
            <div>
              <img src="/logo.png" alt="/logo.png" className="w-50" />
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col">
              <span className="text-2xl font-bold">FS</span>
            </div>
          )}
        </div>

        {/* Only Navigation Scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6">
          {sideBar && (
            <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Workspace
            </p>
          )}

          <nav className="space-y-1.5">
            {dashboardTabs.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ""}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10  hover:bg-white/20"
                        : " hover:bg-white/10 "
                    }`
                  }
                >
                  <>
                    <Icon size={21} />
                    {sideBar && <span>{item.tab}</span>}
                  </>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Fixed Sidebar Footer */}
        <div className="shrink-0 border-t border-gray-900 p-4">
          <button
            type="button"
            onClick={() => {
              // Connect your logout function here.
            }}
            className="flex w-full items-center cursor-pointer gap-3 rounded px-3.5 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <MdLogout size={20} />
            {sideBar && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Area: Independent Scroll */}
      <div className="flex  bg-white   min-w-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
