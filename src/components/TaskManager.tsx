import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-4  rounded-lg border bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors text-white"
        />
        <Button onClick={addTask} size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTask(task.id)}
              className={
                task.completed ? "text-primary" : "text-muted-foreground"
              }
            >
              <CheckCircle2 className="w-5 h-5" />
            </Button>
            <span
              className={`flex-1 ${
                task.completed ? "line-through text-muted-foreground" : ""
              } text-white`}
            >
              {task.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="text-destructive hover:text-destructive/90 text-orange-500"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
