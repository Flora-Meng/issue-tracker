"use client";

import React, { useEffect, useState } from "react";
import { fetchTodos } from "../services/todoService";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";
import styles from "../styles/Home.module.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleFetchTodos = async () => {
    const todosData = await fetchTodos();
    setTodos(todosData);
  };

  useEffect(() => {
    handleFetchTodos();
  }, []);

  const openNewModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={openNewModal} className={styles.button}>
        New
      </button>
      <TodoModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        fetchTodos={handleFetchTodos}
        todo={selectedTodo}
      />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          fetchTodos={handleFetchTodos}
          openEditModal={openEditModal}
        />
      ))}
    </div>
  );
};

export default TodoList;
