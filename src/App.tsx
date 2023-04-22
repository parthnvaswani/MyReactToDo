import { useState, useEffect } from "react";
import "./App.css";
import ToDoCard from "./components/ToDoCard";
import ToDoForm from "./components/ToDoForm";

interface ToDo {
	id: number;
	content: string;
	isCompleted: boolean;
}

function App() {
	const [todos, setTodos] = useState<ToDo[]>(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			return JSON.parse(savedTodos);
		} else {
			return [];
		}
	});

	/**
	 * Add a new todo to the list
	 *
	 * @param {string} content - The content of the todo
	 * @returns {void}
	 */
	const addTodo = (content: string): void => {
		const newTodo = {
			id: Math.floor(Math.random() * 10000),
			content,
			isCompleted: false,
		};
		setTodos([...todos, newTodo]);
	};

	/**
	 * Delete a todo from the list
	 *
	 * @param {number} id - The id of the todo
	 * @returns {void}
	 */
	const deleteTodo = (id: number): void => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	/**
	 * Edit a todo from the list
	 *
	 * @param {number} id - The id of the todo
	 * @param {string} content - The content of the todo
	 * @returns {void}
	 */
	const editTodo = (id: number, content: string): void => {
		if (content === "") {
			return;
		}
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					content,
				};
			}
			return todo;
		});
		setTodos(newTodos);
	};

	/**
	 * Toggle the isCompleted property of a todo
	 *
	 * @param {number} id - The id of the todo
	 * @returns {void}
	 */
	const toggleTodo = (id: number): void => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					isCompleted: !todo.isCompleted,
				};
			}
			return todo;
		});
		setTodos(newTodos);
	};

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="todo-container">
			<h1 className="title">ToDo App</h1>
			<div className="todo-list">
				{todos.map((todo) => (
					<ToDoCard
						key={todo.id}
						{...todo}
						deleteTodo={deleteTodo}
						editTodo={editTodo}
						toggleTodo={toggleTodo}
					/>
				))}
			</div>
			<ToDoForm addTodo={addTodo} />
		</div>
	);
}

export default App;
