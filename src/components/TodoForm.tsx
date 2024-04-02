import React, { Dispatch, SetStateAction, useState } from 'react';

import ToDoService from '../Todoservise';
import TodoTypes from '../todo';
import '../css/TodoForm.css';

interface PropTypes {
	setToDos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setToDos }) => {
	const [newTodoText, setNewTodoText] = useState<string>('');

	const handleAddToDo = () => {
		if (newTodoText.trim() !== '') {
			const newToDo = ToDoService.addToDos(newTodoText);
			setToDos(prevToDos => [...prevToDos, newToDo]);
			setNewTodoText('');
		}
	};
	return (
		<div className='inputForm'>
			<input
				type='text'
				value={newTodoText}
				onChange={e => setNewTodoText(e.target.value)}
				autoFocus={true}
				placeholder='Add a Task'
			/>

			<button onClick={handleAddToDo}>Add to do</button>
		</div>
	);
};

export default TodoForm;
