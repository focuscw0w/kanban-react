import { useContext } from "react";
import { useSelector } from "react-redux";

import LogoIcon from "./icons/LogoIcon";
import ThemeContext from "../context/ThemeContext";
import useModalHandler from "../hooks/useModalHandler";
import ActionMenu from "./ActionMenu";

const Header = ({ isVisibleSidebar }) => {
  const { theme } = useContext(ThemeContext);
  const boardName = useSelector((state) => state.boardsState.boardName);

  const { handleOpenModal } = useModalHandler();

  const taskModalSettings = {
    name: "taskModal",
    mode: "add",
    type: "task",
  };

  return (
    <div className={`${theme === "dark" ? "bg-mediumGray" : "bg-white"} flex`}>
      <LogoIcon isVisibleSidebar={isVisibleSidebar} />
      <div
        className={`${
          theme === "dark" ? "border-grayBlue" : ""
        } flex justify-between items-center grow px-4 border-b`}
      >
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-darkBlue"
          } text-2xl font-bold`}
        >
          {boardName}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleOpenModal([], taskModalSettings)}
            className="bg-purple rounded-full py-3 px-4 text-white hover:opacity-70"
          >
            + Add New Task
          </button>
          <ActionMenu boardName={boardName} itemName="Board" />
        </div>
      </div>
    </div>
  );
};

export default Header;
