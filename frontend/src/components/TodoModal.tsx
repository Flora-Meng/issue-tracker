'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createTodo, updateTodo } from '../services/todoService';
import { TodoModalProps } from '../types/Todo';

const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onRequestClose,
  fetchTodos,
  todo,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('No Progress');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }, []);

  // Update form fields when `todo` prop changes
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

  // Handle form submission
  const handleSaveTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (todo) {
        await updateTodo(todo._id, title, description, status);
      } else {
        await createTodo(title, description, status);
      }
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
      <form onSubmit={handleSaveTodo} className="space-y-4">
        <fieldset>
          <legend className="text-2xl font-bold mb-4">
            {todo ? 'Edit Todo' : 'Add Todo'}
          </legend>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-semibold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description:
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-2 font-semibold">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="No Progress">No Progress</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </fieldset>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white p-2 rounded-md mr-2 hover:bg-gray-600 flex-1 min-w-[100px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex-1 min-w-[100px]"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoModal;
