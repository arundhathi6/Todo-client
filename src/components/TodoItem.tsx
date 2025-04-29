import { Todo } from "../types";

type Props = {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (updatedTodo: any) => void;
};

export default function TodoItem({
  todo,
  onDelete,
  onToggleStatus,
  onEdit,
}: Props) {

  return (
    <div className="flex justify-between items-start border p-3 mb-3 rounded shadow bg-white">
      <div>
        <h4 className="font-semibold text-lg">{todo.title}</h4>
        <p className="text-sm text-gray-600">{todo.description}</p>
        <p className="text-xs mt-1">Due: {todo.dueDate}</p>
        <p
          className={`mt-2 text-sm font-medium ${
            todo.status === "completed" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          Status: {todo.status}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => onToggleStatus(todo._id)}
        >
          {todo.status === "pending" ? "Completed" : "Pending"}
        </button>
        <button
            className="text-green-600 hover:underline text-sm"
            onClick={() => onEdit(todo)}
          >
            Edit
          </button>
        <button
          className="text-red-600 hover:underline text-sm"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
