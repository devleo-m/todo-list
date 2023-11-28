// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      setFeedbackMessage('Tarefa adicionada com sucesso!');
    } else {
      setFeedbackMessage('Digite o nome da tarefa antes de adicionar.');
    }

    // Limpa a mensagem de feedback após 3 segundos
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    setFeedbackMessage(
      updatedTasks[index].completed
        ? 'Tarefa marcada como concluída.'
        : 'Tarefa desmarcada.'
    );

    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    const removedTaskText = updatedTasks[index].text;
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setFeedbackMessage(`Tarefa "${removedTaskText}" removida.`);

    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Task List</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nova Tarefa"
        />
        <button onClick={addTask}>Adicionar Tarefa</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {task.text}
            <button onClick={() => toggleTask(index)}>
              {task.completed ? 'Desmarcar' : 'Marcar'}
            </button>
            <button onClick={() => removeTask(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      {feedbackMessage && (
        <p className="feedback-message">{feedbackMessage}</p>
      )}
    </div>
  );
}

export default TodoList;
