'use client';

import React from 'react';
import { deleteTodo } from '../services/todoService';
import { TodoItemProps } from '../types/Todo';
import styles from '../styles/Home.module.css';

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  fetchTodos,
  openEditModal,
}) => {
  // Handle delete action
  const handleDelete = async () => {
    await deleteTodo(todo._id);
    fetchTodos();
  };

  return (
    <article className={styles.todoItem}>
      <header>
        <h3 className={styles.todoTitle}>{todo.title}</h3>
      </header>
      <p className={styles.todoDescription}>Description: {todo.description}</p>
      <p className={styles.todoStatus}>Status: {todo.status}</p>
      <footer className={styles.todoActions}>
        <button
          onClick={() => openEditModal(todo)}
          className={styles.editButton}
          aria-label={`Edit ${todo.title}`}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className={styles.deleteButton}
          aria-label={`Delete ${todo.title}`}
        >
          Delete
        </button>
      </footer>
    </article>
  );
};

export default TodoItem;
