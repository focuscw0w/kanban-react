import ActionMenu from "../ActionMenu";
import StatusSelect from "./StatusSelect";
import SubtaskItem from "./SubtaskItem";

import { useDispatch, useSelector } from "react-redux";
import { calculateCompletedSubtasks } from "../../helpers/helpers";
import { updateSubtaskStatus, updateTask } from "../../store/boards-slice";
import { setModalData } from "../../store/modal-slice";
import { useState, useEffect } from "react";

import useCurrentTask from "../../hooks/useCurrentTask";

const TaskDetail = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

  const { task, boardName, columnName } = modalData;

  const currentTask = useCurrentTask(boardName, task, columnName);

  const [currentStatus, setCurrentStatus] = useState(task.status);

  useEffect(() => {
    if (task) {
      setCurrentStatus(task.status);
    }
  }, [task]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const updatedTask = { ...task, status: newStatus, oldTask: task };
    setCurrentStatus(newStatus);
    dispatch(updateTask({ boardName, task: updatedTask }));
    dispatch(
      setModalData({
        boardName,
        columnName: updatedTask.status,
        task: updatedTask,
      })
    );
  };

  const handleSubtaskToggle = (index) => {
    dispatch(
      updateSubtaskStatus({
        boardName,
        columnName,
        taskTitle: task.title,
        subtaskIndex: index,
      })
    );
  };

  const { completedSubtasksCount, allSubtasksCount } =
    calculateCompletedSubtasks(currentTask);

  return (
    <div className="p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-xl font-bold">{currentTask.title}</h1>
        <ActionMenu boardName={boardName} task={task} itemName="Task" />
      </div>
      <p className="text-grayBlue text-sm mb-4">{currentTask.description}</p>
      <p className="text-sm text-white font-bold mb-4">
        Subtasks ({completedSubtasksCount} of {allSubtasksCount})
      </p>
      <div className="space-y-4">
        {currentTask.subtasks.map((subtask, index) => (
          <SubtaskItem
            key={index}
            subtask={subtask}
            onToggle={() => handleSubtaskToggle(index)}
          />
        ))}
      </div>
      <div className="mt-6">
        <label className="block text-sm text-white font-bold mb-2">
          Current Status
        </label>
        <StatusSelect
          currentStatus={currentStatus}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
