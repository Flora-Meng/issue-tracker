'use client';

import React, { useEffect, useState } from 'react';
import { fetchTodos } from '../services/todoService';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import TodoModal from './TodoModal';
import styles from '../styles/Home.module.css';

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
    <section>
    <header className={styles.navbar}>
      <h1 className="text-2xl font-bold">Todo Tracker</h1>
      <button onClick={openNewModal} className={styles.button} aria-label="Add new todo">
        New
      </button>
    </header>

    <TodoModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      fetchTodos={handleFetchTodos}
      todo={selectedTodo}
    />

    <div className={styles.todoContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            fetchTodos={handleFetchTodos}
            openEditModal={openEditModal}
          />
        ))
      ) : (
        <p className={styles.noTodos}>No todos available. Add a new todo to get started!</p>
      )}
    </div>
  </section>
  );
};

export default TodoList;
