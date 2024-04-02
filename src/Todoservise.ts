import TodoTypes from './todo';

const LOCAL_STORAGE_KEY = 'todos';

const ToDoService = {
	getToDos: (): TodoTypes[] => {
		const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
		return todoStr ? JSON.parse(todoStr) : [];
	},
	addToDos: (text: string): TodoTypes => {
		const toDos = ToDoService.getToDos();
		const newTodo: TodoTypes = { id: toDos.length + 1, text, completed: false };
		const updateToDos = [...toDos, newTodo];
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateToDos));
		return newTodo;
	},

	updateToDo: (toDo: TodoTypes): TodoTypes => {
		const toDos = ToDoService.getToDos();

		const updateToDos = toDos.map(t => (t.id === toDo.id ? toDo : t));
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateToDos));
		return toDo;
	},

	deleteTodo: (id: number): void => {
		const toDos = ToDoService.getToDos();
		const updateToDos = toDos.filter(toDo => toDo.id !== id);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateToDos));
	},
};

export default ToDoService;
