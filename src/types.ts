
export type TodoStatus = "pending" | "completed";

export type Todo = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TodoStatus;
};