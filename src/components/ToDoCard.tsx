import { useState, useRef } from "react";
import {
	faPen,
	faTrashCan,
	faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ToDoCardProps {
	id: number;
	content: string;
	isCompleted: boolean;
	deleteTodo: (id: number) => void;
	editTodo: (id: number, content: string) => void;
	toggleTodo: (id: number) => void;
}

function ToDoCard(todo: ToDoCardProps) {
	const { id, content, isCompleted, deleteTodo, editTodo, toggleTodo } = todo;
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div
			className="todo-card"
			style={{ backgroundColor: isCompleted ? "lightgreen" : "inherit" }}
		>
			{isEditing ? (
				<input
					type="text"
					className="todo-edit-input"
					defaultValue={content}
					ref={inputRef}
				/>
			) : (
				<p className="todo-content" onClick={() => toggleTodo(id)}>
					{content}
				</p>
			)}
			{isEditing ? (
				<button
					className="todo-save"
					onClick={() => {
						setIsEditing(false);
						editTodo(id, inputRef.current?.value || "");
					}}
				>
					<FontAwesomeIcon icon={faFloppyDisk} />
				</button>
			) : (
				<button className="todo-edit" onClick={() => setIsEditing(true)}>
					<FontAwesomeIcon icon={faPen} />
				</button>
			)}
			<button className="todo-delete" onClick={() => deleteTodo(id)}>
				<FontAwesomeIcon icon={faTrashCan} />
			</button>
		</div>
	);
}

export default ToDoCard;
