import "./App.css";
import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Tabs } from "antd";

export default function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  const items = [
    {
      key: "ongoing",
      label: (
        <div className="text-xl mb-4 text-left text-[30px]">Đang diễn ra</div>
      ),
      children: (
        <>
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks.filter((task) => task.isDone === false)}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </>
      ),
    },
    {
      key: "completed",
      label: (
        <div className="text-xl mb-4 text-left text-[30px]">Đã Hoàn Thành</div>
      ),
      children: (
        <>
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks.filter((task) => task.isDone === true)}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <h2 className="mb-4 p-4 text-[40px] font-semibold">Quản lý Công việc</h2>

      <Tabs defaultActiveKey="ongoing" centered items={items} />
    </>
  );
}
