import { useState } from "react";
import { Todo, TodoStatus } from "../types";

type Props = {
  onAdd: (todo: Todo) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      _id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: "pending",
    };

    onAdd(newTodo);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="shadow p-4 rounded mb-6 space-y-4">
      <h3 className="text-xl font-semibold">Add New Todo</h3>
      <input
        type="text"
        placeholder="Title"
        className="w-full border dark:border-white p-2 rounded bg-white text-black dark:bg-gray-300 dark:text-black transition-colors"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full border dark:border-white p-2 rounded bg-white text-black dark:bg-gray-300 dark:text-black transition-colors"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="w-full border dark:border-white p-2 rounded bg-white text-black dark:bg-gray-300 dark:text-black transition-colors"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Todo
      </button>
    </form>
  );
}
