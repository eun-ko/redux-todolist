import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { TOGGLE_PAGE } from '../../modules/PageToggleReducer';
import { TOGGLE_TODO, DELETE_TODO, Todo } from '../../modules/TodosReducer';

import TodoItem from './TodoItem';

import todos from '../../../fixtures/todos';

jest.mock('react-redux');

describe('<TodoItem/>', () => {
  const setEditButtonSelected = jest.fn();
  const setSelectedTodo = jest.fn();

  const renderTodoItem = (
    todo: Todo,
    editButtonSelected: boolean,
    setEditButtonSelected: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedTodo: React.Dispatch<React.SetStateAction<Todo>>
  ) => {
    return render(
      <TodoItem
        todo={todo}
        editButtonSelected={editButtonSelected}
        setEditButtonSelected={setEditButtonSelected}
        setSelectedTodo={setSelectedTodo}
      />
    );
  };

  it('editIcon 클릭시 setEditButtonSelected, setSelectedTodo가 호출되고 TOGGLE_PAGE action이 dispatch되는지', () => {
    const dispatch = jest.fn();
    //@ts-ignore
    useDispatch.mockImplementation(() => dispatch);

    renderTodoItem(todos[0], false, setEditButtonSelected, setSelectedTodo);

    const editBtn = screen.getByAltText('editIcon');
    fireEvent.click(editBtn);

    expect(setEditButtonSelected).toHaveBeenCalledTimes(1);
    expect(setSelectedTodo).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({
      type: TOGGLE_PAGE,
    });
  });

  it('todoContent 클릭시 TOGGLE_TODO action이 dispatch 되는지', () => {
    const dispatch = jest.fn();
    //@ts-ignore
    useDispatch.mockImplementation(() => dispatch);

    renderTodoItem(todos[0], false, setEditButtonSelected, setSelectedTodo);

    const todoContent = screen.getByTestId('todoContent');
    fireEvent.click(todoContent);

    expect(dispatch).toBeCalledWith({
      type: TOGGLE_TODO,
      id: todos[0].id,
    });
  });

  it('deleteIcon 클릭시 DELETE_TODO action이 dispatch되는지', () => {
    const dispatch = jest.fn();
    //@ts-ignore
    useDispatch.mockImplementation(() => dispatch);

    renderTodoItem(todos[1], false, setEditButtonSelected, setSelectedTodo);

    const deleteBtn = screen.getByAltText('deleteIcon');
    fireEvent.click(deleteBtn);

    expect(dispatch).toBeCalledWith({
      type: DELETE_TODO,
      id: todos[1].id,
    });
  });
});
