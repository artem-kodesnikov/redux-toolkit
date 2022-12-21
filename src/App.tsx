import React, { useEffect, useState } from 'react';
import { Posts } from './components/posts/posts';
import { Todos } from './components/todos/todos';
import { User } from './components/user/user';
import { TodoItem } from './components/todoItem/todoItem';
import './styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppSelector } from './app/hooks';
import { Todo } from './features/todoSlice';

function App() {
  const todos = useAppSelector((state) => state.todos.todos);
  const sortType = useAppSelector((state) => state.todos.sortType);
  const filterType = useAppSelector((state) => state.todos.filterType);
  const [filtered, setFiltered] = useState(todos);

  const getPreparedList = (list: Todo[]) => {
    let result = list;
    
    switch(sortType) {
      case 'ASC':
        result = [...result].sort((a: any, b: any) => a.title - b.title); 
        break;
      case 'DESC':
        result = [...result].sort((a: any, b: any) => b.title - a.title);
        break;
      case 'DEFAULT':
        result = result;
        break;
    }
    result = result.filter((todo) => {
      switch(filterType) {
        case 'ACTIVE':
          return !todo.completed; 
        case 'COMPLETED':
          return todo.completed; 
        case 'ALL':
          return todo;
      }
    });
    return result;
  };

  useEffect(() => {
    setFiltered(getPreparedList(todos)); 
  },[todos, sortType, filterType]);
  return (
    <div className='container mw-100'>
      <div className="wrapper">
        <div className='d-flex flex-column'>
          <h3>Redux Toolkit State Change</h3>
          <User />
        </div>
        <div className='todo_form'>
          <h3>Redux Toolkit Todo App</h3>
          <Todos />
          {filtered.map((todo) => (
            <TodoItem
              key={todo.id}
              value={todo}
            />
          ))}
        </div>
        <div className='get_posts'>
          <h3>Redux Toolkit Async Thunk</h3>
          <Posts />
        </div>
      </div>
    </div>
  );
}

export default App;
