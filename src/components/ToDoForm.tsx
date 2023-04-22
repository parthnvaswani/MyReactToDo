import { useState } from "react";

interface ToDoFormProps {
    addTodo: (content: string) => void;
}

function ToDoForm({ addTodo }: ToDoFormProps) {
  const [newToDo, setNewToDo] = useState("");

  /**
   * Handle the submit of the form
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newToDo) return;
    addTodo(newToDo);
    setNewToDo("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
        placeholder="Add new tasks in your list"
        className="todo-input"
      />
      <button type="submit" className="todo-button">Add</button>
    </form>
  );
}

export default ToDoForm;
