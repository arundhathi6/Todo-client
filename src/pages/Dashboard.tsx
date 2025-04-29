import { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import { Todo, TodoStatus } from "../types";
import TodoForm from "../components/TodoForm";
import axios from "axios";
const API_URL = "https://todo-backend-mrjv.onrender.com";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        if (!token) {
          alert("Authorization required!");
          setLoading(false);
          throw new Error("Authorization token is missing");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_URL}/todo`, config);
        setTodos(response.data);
        setLoading(false);
        console.log("Get todo list", response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo: {
    title: string;
    description: string;
    dueDate: string;
    status: TodoStatus;
  }) => {
    try {
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}/todo`, newTodo, config);
      const addedTodo = response.data;
      // console.log("adding todo...", addedTodo);
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      alert("Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error adding todo");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const confirmDelete = window.confirm("Do you want to delete this todo?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${API_URL}/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        alert("Deleted todo!");
        setTodos(updatedTodos);
      } else {
        console.error("Failed to delete todo:", response.data);
        alert("Failed to delete todo!");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo!");
    }
  };

  const handleToggleStatus = async (id: string) => {
    if (!token) {
      console.error("Authorization token is missing");
      return;
    }

    const todoToUpdate = todos.find((todo) => todo._id === id);
    if (!todoToUpdate) return;

    const updatedStatus =
      todoToUpdate.status === "pending" ? "completed" : "pending";

    try {
      const response = await axios.put(
        `${API_URL}/todo/${id}`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTodo = response.data;

      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, status: updatedTodo.status } : todo
      );
      alert("status updated!");
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo status:", error);
      alert("status updated failed!");
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
    setNewTodo({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      status: todo.status,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editTodo) return;
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/todo/${editTodo._id}`,
        {
          ...newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo._id === editTodo._id ? response.data : todo
        );

        setTodos(updatedTodos);
        setIsEditing(false);
        setEditTodo(null);
        setNewTodo({
          title: "",
          description: "",
          dueDate: "",
          status: "pending",
        });
        alert("Updated successfully!");
      } else {
        console.error("Failed to update todo:", response.data);
        alert("Failed to update todo!");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* Todo Form for adding new todos */}
      <TodoForm onAdd={handleAddTodo} />
      <div className="mb-4">
        <button
          className={`px-3 py-1 mr-2 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 mr-2 rounded ${
            filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="h-72 overflow-y-auto flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500 text-center w-full">Loading...</p>
        ) : (
          <div className="flex flex-col justify-between w-full">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={() => handleDeleteTodo(todo._id)}
                onToggleStatus={() => handleToggleStatus(todo._id)}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Edit To-Do</h2>
            <input
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              type="text"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              placeholder="Title"
            />
            <textarea
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              type="date"
              value={newTodo.dueDate}
              onChange={(e) =>
                setNewTodo({ ...newTodo, dueDate: e.target.value })
              }
            />
            <select
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={newTodo.status}
              onChange={(e) =>
                setNewTodo({ ...newTodo, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
