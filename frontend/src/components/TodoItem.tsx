"use client";

import React from 'react';
import { deleteTodo } from '../services/todoService';
import { TodoItemProps } from '../types/Todo';
import styles from '../styles/Home.module.css';

const TodoItem: React.FC<TodoItemProps> = ({ todo, fetchTodos, openEditModal }) => {
  const handleDelete = async () => {
    await deleteTodo(todo._id);
    fetchTodos();
  };

  return (
    <div className={styles.todoItem}>
      <h3 className={styles.todoTitle}>{todo.title}</h3>
      <p className={styles.todoDescription}>Description: {todo.description}</p>
      <p className={styles.todoStatus}>Status: {todo.status}</p>
      <div className={styles.todoActions}>
        <button onClick={() => openEditModal(todo)} className={styles.editButton}>
          Edit
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
