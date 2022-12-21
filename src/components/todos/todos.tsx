import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { InputGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTodo, changeFilter, changeSorting } from "../../features/todoSlice";
import { v4 } from 'uuid';

export const Todos = () => {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state.todos.sortType);
  const [todoTitle, setTodoTitle] = useState('');

  const addTodoHandler = (e: any) => {
    e.preventDefault();
    const todo = {
      id: v4(),
      title: todoTitle.trim(),
      completed: false,
    };
    if (todoTitle.trim().length) {
      dispatch(addTodo(todo));
    }
    setTodoTitle('');
  };

  const sortTodoHandler = () => {
    switch(sortType) {
      case 'ASC':
        dispatch(changeSorting('DESC'));
        break;
      case 'DESC':
        dispatch(changeSorting('DEFAULT'));
        break;
      case 'DEFAULT':
        dispatch(changeSorting('ASC'));
    }
  };


  return (
    <Form 
      className="mb-3"
    >
      <Form.Group className="mb-3">
        <InputGroup>
          <Form.Control 
            onChange={(e) => setTodoTitle(e.target.value)} 
            type="text" 
            placeholder="Type something"
            value={todoTitle} 
          />
          <Form.Control.Feedback type="invalid">
            Please type a todo.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit"
        onClick={(e) => addTodoHandler(e)}
        className="me-5"
      >
        Submit
      </Button>
      <Button 
        variant="primary" 
        onClick={() => sortTodoHandler()}
        className='d-inline-flex align-items-center'
      >
        Sort
        {sortType === 'ASC' && 
          <img 
            className="ms-2"
            style={{height: '15px', width: '15px', filter: 'invert(0%) sepia(83%) saturate(7432%) hue-rotate(209deg) brightness(20%) contrast(115%)'}} 
            src="./icon/up-arrow.svg"
            alt="arrow" 
          />
        }
        {sortType === 'DESC' && 
          <img 
            className="ms-2"
            style={{height: '15px', width: '15px', filter: 'invert(0%) sepia(83%) saturate(7432%) hue-rotate(209deg) brightness(20%) contrast(115%)'}} 
          src="./icon/down-arrow.svg"
          alt="arrow" 
        />
      }
      </Button>
      <div className="mt-3">
        <Button
          className="me-3"
          variant="success" 
          onClick={() => dispatch(changeFilter('COMPLETED'))}
        >
          Filter Completed
        </Button>
        <Button
          className="me-3"
          variant="success" 
          onClick={() => dispatch(changeFilter('ALL'))}
        >
          ALL
        </Button>
        <Button 
          variant="success" 
          onClick={() => dispatch(changeFilter('ACTIVE'))}
        >
          ACTIVE
        </Button>
      </div>
    </Form>
  );
};