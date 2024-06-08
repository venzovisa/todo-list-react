export type TodoType = {
  id: string; // uuid "8d0208a0-0776-4b18-9355-6969ffb29081"
  deadline: string; // date "2024-06-28"
  title: string;
  description: string;
  completed: boolean;
  disabled: boolean;
};

type NewTodoType = {
  id?: string; // uuid "8d0208a0-0776-4b18-9355-6969ffb29081"
  deadline: string; // date "2024-06-28"
  title: string;
  description: string;
};

export type TodoFormType = {
  todo: TodoType;
  open: boolean;
  onClose: () => void;
  onChange: (params: NewTodoType) => void;
};
