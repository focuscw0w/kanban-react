import { useContext } from "react";
import { useSelector } from "react-redux";

import ThemeContext from "../../context/ThemeContext";
import ThemeToggler from "./ThemeToggler";
import HideSidebarIcon from "../icons/HideSidebarIcon";
import Navigation from "./Navigation";

const SidebarContent = ({ hideSidebar }) => {
  const { theme } = useContext(ThemeContext);
  const boardCounter = useSelector((state) => state.boardsState.boards).length;

  return (
    <aside
      className={`${
        theme === "dark" ? "border-grayBlue" : ""
      } flex flex-col sm:h-screen sm:border-r width-250`}
    >
      <div
        className={`flex flex-col justify-between h-full pt-3 sm:pt-0 rounded-md sm:rounded-none ${
          theme === "dark" ? "bg-mediumGray" : "bg-white"
        }`}
      >
        <div>
          <div className="mt-2">
            <p className="uppercase text-lightGrayText text-xs tracking-widest font-bold px-8 mb-8">
              All boards ({boardCounter})
            </p>
            <div className="pr-8">
              <Navigation />
            </div>
          </div>
        </div>
        <div className="p-8">
          <ThemeToggler />
          <button
            onClick={hideSidebar}
            className={`${theme === "dark" ? "hover:text-white" : "text-grayBlue"} flex gap-3 text-lightGrayText text-xs `}
            type="button"
          >
            <HideSidebarIcon />
            Hide Sidebar
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarContent;
