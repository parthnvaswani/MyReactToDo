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

	const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([]);

	const [sort, setSort] = useState(false);

	const [search, setSearch] = useState("");

	/**
	 * Add a new todo to the list
	 *
	 * @param {string} content - The content of the todo
	 * @returns {void}
	 */
	const addTodo = (content: string): void => {
		if (content.trim() === "") {
			return;
		}
		const newTodo = {
			id: Math.max(...todos.map((todo) => todo.id), 0) + 1,
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
		if (content.trim() === "") {
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

	useEffect(() => {
		if (sort) {
			const newTodos = [...todos].sort((a, b) => {
				if (a.isCompleted && !b.isCompleted) {
					return 1;
				} else if (!a.isCompleted && b.isCompleted) {
					return -1;
				} else {
					return 0;
				}
			});
			setTodos(newTodos);
		} else {
			const newTodos = [...todos].sort((a, b) => a.id - b.id);
			setTodos(newTodos);
		}
	}, [sort, todos]);

	useEffect(() => {
		const newTodos = [...todos].filter((todo) =>
			todo.content.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredTodos(newTodos);
	}, [search, todos]);

	return (
		<div className="todo-container">
			<h1 className="title">ToDo App</h1>
			<input
				className="search-input"
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button className="sort-btn" onClick={() => setSort((sort) => !sort)}>
				Sort Tasks
			</button>
			<button className="clear-btn" onClick={() => setTodos([])}>
				Clear Tasks
			</button>
			<div className="todo-list">
				{search.trim() !== ""
					? filteredTodos.map((todo) => (
							<ToDoCard
								key={todo.id}
								{...todo}
								deleteTodo={deleteTodo}
								editTodo={editTodo}
								toggleTodo={toggleTodo}
							/>
					  ))
					: todos.map((todo) => (
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
