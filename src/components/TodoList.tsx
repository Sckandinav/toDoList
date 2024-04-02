import React, { useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import TodoTypes from '../todo';
import ToDoService from '../Todoservise';
import TodoForm from './TodoForm';
import '../css/TodoList.css';

const TodoList = () => {
	const [toDos, setToDos] = useState<TodoTypes[]>(ToDoService.getToDos());

	const [editingToDoId, setEditingToDoId] = useState<number | null>(null);
	const [editedToDoText, setEditedToDoText] = useState<string>('');

	const handleEditStart = (id: number, text: string) => {
		setEditingToDoId(id);
		setEditedToDoText(text);
	};

	const handleEditCancel = () => {
		setEditingToDoId(null);
		setEditedToDoText('');
	};

	const handleEditSave = (id: number) => {
		if (editedToDoText.trim() !== '') {
			const updateToDo = ToDoService.updateToDo({
				id,
				text: editedToDoText,
				completed: false,
			});
			setToDos(prevToDos =>
				prevToDos.map(toDo => (toDo.id === id ? updateToDo : toDo))
			);

			setEditingToDoId(null);
			setEditedToDoText('');
		}
	};

	const handleDeleteTodo = (id: number) => {
		ToDoService.deleteTodo(id);
		setToDos(prevTodo => prevTodo.filter(todo => todo.id !== id));
	};

	return (
		<div className='todoContainer'>
			<div>
				<TodoForm setToDos={setToDos} />
			</div>
			<div className='todos'>
				{toDos.map(todo => (
					<div key={todo.id} className='items'>
						{editingToDoId === todo.id ? (
							<div className='editText'>
								<input
									type='text'
									value={editedToDoText}
									onChange={e => setEditedToDoText(e.target.value)}
									autoFocus={true}
								/>

								<button onClick={() => handleEditSave(todo.id)}>
									<FaCheck />
								</button>
								<button
									className='cancelBtn'
									onClick={() => handleEditCancel()}
								>
									<GiCancel />
								</button>
							</div>
						) : (
							<div className='editBtn'>
								<span>{todo.text}</span>
								<button onClick={() => handleEditStart(todo.id, todo.text)}>
									<FaEdit />
								</button>
							</div>
						)}

						<button onClick={() => handleDeleteTodo(todo.id)}>
							<RiDeleteBin5Fill />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default TodoList;
