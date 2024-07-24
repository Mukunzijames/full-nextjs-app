'use client';

import { useState, useEffect } from 'react';
import {
  fetchTodos,
  createTask,
  deleteTask,
  updateTask
} from '../services/request';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { Button } from '@/components/ui/button';

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetchTodos();
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, []);

  const handleCreateTask = async () => {
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '' });
      const response = await fetchTodos();
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      const response = await fetchTodos();
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (
    id: number,
    title: string,
    description: string
  ) => {
    try {
      await updateTask({ id, title, description });
      const response = await fetchTodos();
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 mt-14">
        <div className="p-4">
          <h1 className="text-2xl mb-4">Website todo</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 mb-2 w-full  bg-white rounded-md"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={e =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border p-2 mb-2 w-full bg-white rounded-md"
            />
            <Button
              onClick={handleCreateTask}
              className="bg-purple-500 text-white py-2 px-4 rounded"
            >
              + New task
            </Button>
          </div>
          <ul>
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex justify-between items-center mb-2 p-2 shadow-lg"
              >
                <div>
                  <p className="font-bold text-gray-500">{todo.title}</p>
                  <p className="text-gray-500">{todo.description}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(todo.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex">
                  <Button
                    onClick={() =>
                      handleUpdateTask(todo.id, todo.title, todo.description)
                    }
                    className="text-purple-500 text-2xl"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDeleteTask(todo.id)}
                    className="text-purple-500 text-2xl"
                  >
                    <MdDelete />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
