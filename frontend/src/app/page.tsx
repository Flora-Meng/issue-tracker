import React from 'react';
import TodoList from '../components/TodoList';
import '../styles/Modal.css';

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <TodoList />
    </div>
  );
};

export default Home;
