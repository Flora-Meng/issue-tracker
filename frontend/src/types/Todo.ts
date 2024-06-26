export interface Todo {
    _id: string;
    title: string;
    description: string;
    status: string;
  }
  
export interface TodoModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    fetchTodos: () => void;
    todo?: Todo | null;
  }
  
export interface TodoItemProps {
    todo: Todo;
    fetchTodos: () => void;
    openEditModal: (todo: Todo) => void;
  }