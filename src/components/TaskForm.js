import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
      navigate("/");
    } else {
      dispatch(
        addTask({
          ...task,
          id: Math.floor(Math.random() * 1000),
        })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === parseInt(params.id));
      if (taskFound) {
        setTask(taskFound);
      }
    }
  }, [params.id, tasks]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-zinc-800 max-w-sm p-4 mb-1"
    >
      <label htmlFor="title" className="block text-xs font-bold mb-2">
        Task:
      </label>
      <input
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="title"
        name="title"
        value={task.title}
        className="w-full p-2 rounded-md bg-zinq-600 mb-2 text-black"
      />
      <label htmlFor="description" className="block text-xs font-bold mb-2">
        Description:
      </label>
      <textarea
        onChange={(e) => handleChange(e)}
        name="description"
        placeholder="description"
        value={task.description}
        className="w-full p-2 rounded-md bg-zinq-600 mb-2 text-black"
      ></textarea>
      <button className="bg-indigo-600 px-2 py-1">Save</button>
    </form>
  );
};

export default TaskForm;
