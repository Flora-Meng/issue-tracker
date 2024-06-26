"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { saveTodo } from '../services/todoService';
import { TodoModalProps } from '../types/todo';

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onRequestClose, fetchTodos, todo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('No Progress');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }, []);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('No Progress');
    }
  }, [todo]);

  const handleSaveTodo = async () => {
    try {
      await saveTodo(todo, title, description, status);
      fetchTodos();
      onRequestClose();
    } catch (error) {
      console.error('Failed to save todo', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Todo Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl mb-2">{todo ? 'Edit Todo' : 'Add Todo'}</h2>
      <div className="mb-2">
        <label className="block mb-1">Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Description:</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="No Progress">No Progress</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button onClick={handleSaveTodo} className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </Modal>
  );
};

export default TodoModal;
