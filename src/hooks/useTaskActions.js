import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../store/boards-slice";
import { closeModal, openModal, setModalData } from "../store/modal-slice";
import { useState, useEffect } from "react";

const useTaskActions = (modalData) => {
  // refactor
  const dispatch = useDispatch();
  const { task, boardName, columName } = modalData;

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
    dispatch(updateTask({ boardName, task: updatedTask, }));
    dispatch(setModalData({ boardName, columName, task: updatedTask}));
  };

  const handleDeleteTask = () => {
    dispatch(removeTask({ boardName, taskTitle: task.title }));
    dispatch(closeModal());
  };

  const openTaskModal = () => {
    dispatch(openModal(["taskModal", "edit", "task"]));
  };

  const taskMenuOptions = [
    {
      label: "Edit",
      action: openTaskModal,
    },
    {
      label: "Delete",
      action: handleDeleteTask,
    },
  ];

  return {
    currentStatus,
    handleStatusChange,
    taskMenuOptions,
  };
};

export default useTaskActions;
