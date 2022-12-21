import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Todo } from "../../features/todoSlice";
import { toggleCompletedTodo, deleteTodo, renameTodo } from "../../features/todoSlice";

type Props = {
  value: Todo,
};

export const TodoItem: React.FC<Props> = ({ value }) => {
  const dispatch = useAppDispatch();
  const { id, title, completed } = value;
  const [isDobleClicked, setIsDobleClicked] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const toggleTodoHandler = (id: number) => {
     dispatch(toggleCompletedTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleDoubleClick = () => {
    setIsDobleClicked(true);
  };

  const handlePressKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDobleClicked(false);
    }

    if (e.key === 'Enter') {
      dispatch(renameTodo([id, newTodoTitle]));
      setIsDobleClicked(false);
    }
  };

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  });


  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div 
        className="btn btn-success" 
        role='button'
        onClick={() => toggleTodoHandler(id)}
      >Complete</div>
      {isDobleClicked 
      ? <input 
          onKeyDown={(e) => handlePressKey(e)} 
          type="text" 
          placeholder="New Title"
          value={newTodoTitle}
          ref={newTodoField}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
      : <div onDoubleClick={() => handleDoubleClick()} className={completed ? 'text-success text-decoration-line-through' : 'text-danger'}>{title}</div>
      }
      <div 
        className="btn btn-danger" 
        role='button'
        onClick={() => handleDeleteTodo(id)}
      >Delete</div>
    </div>
  );
};