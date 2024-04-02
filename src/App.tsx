import { FaPen, FaClipboardList } from 'react-icons/fa';

import './css/app.css';

import TodoList from './components/TodoList';

function App() {
	return (
		<div className='App'>
			<header className='header'>
				<div className='logoside'>
					<FaPen />
					<h1>What To Do</h1>
					<FaClipboardList />
				</div>
			</header>
			<TodoList />
		</div>
	);
}

export default App;
