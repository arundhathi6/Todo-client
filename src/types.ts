
export type TodoStatus = "pending" | "completed";

export type Todo = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TodoStatus;
};