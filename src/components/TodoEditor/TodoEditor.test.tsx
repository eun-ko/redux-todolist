import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { EDIT_TODO, Todo } from '../../modules/TodosReducer';
import { TOGGLE_PAGE } from '../../modules/PageToggleReducer';

import TodoEditor from './TodoEditor';

import todos from '../../../fixtures/todos';

jest.mock('react-redux');

describe('<TodoEditor/>', () => {
  const setEditButtonSelected = jest.fn();
  const onSubmit = jest.fn();

  jest.spyOn(window, 'alert').mockImplementation(() => {});

  const renderTodoEditor = (
    text: string,
    title: string,
    selectedTodo: Todo,
    setEditButtonSelected: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return render(
      <TodoEditor
        text={text}
        title={title}
        selectedTodo={selectedTodo}
        setEditButtonSelected={setEditButtonSelected}
      />
    );
  };

  it('내용과 색을 지정하지 않았을때 alert가 뜨는지 확인', () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });

    const dispatch = jest.fn();
    //@ts-ignore
    useDispatch.mockImplementation(() => dispatch);

    renderTodoEditor(
      '수정하기',
      'example title',
      todos[0],
      setEditButtonSelected
    );

    const todoInput = screen.getByRole('textbox');
    const editIcon = screen.getByTestId('submitBtn');
    fireEvent.change(todoInput, { target: { value: '' } });
    fireEvent.click(editIcon);

    expect(window.alert).toHaveBeenCalledWith('내용과 색을 모두 지정해주세요');

    //Error: Not implemented: HTMLFormElement.prototype.submit
  });

  it('EDIT_TODO action dispatch 확인', () => {
    const dispatch = jest.fn();
    //@ts-ignore
    useDispatch.mockImplementation(() => dispatch);

    renderTodoEditor(
      '수정하기',
      'example title',
      todos[0],
      setEditButtonSelected
    );

    const todoInput = screen.getByRole('textbox');
    const editIcon = screen.getByTestId('submitBtn');
    fireEvent.change(todoInput, {
      target: { value: 'todoContent 예시1 : 빨강 -> 빠알강 으로 수정' },
    });
    fireEvent.click(editIcon);

    expect(dispatch).toBeCalledWith({
      type: EDIT_TODO,
      todo: {
        ...todos[0],
        todoContent: 'todoContent 예시1 : 빨강 -> 빠알강 으로 수정',
      },
    });

    expect(dispatch).toBeCalledWith({
      type: TOGGLE_PAGE,
    });

    expect(setEditButtonSelected).toHaveBeenCalledTimes(1);
    //Error: Not implemented: HTMLFormElement.prototype.submit
  });

  it('ADD_TODO action dispatch 확인', () => {
    const dispatch = jest.fn();
    //@ts-ignore
    useDispatch.mockImplementation(() => dispatch);

    renderTodoEditor(
      '추가하기',
      'example title',
      { id: 0, todoContent: '', todoColor: '', done: false },
      setEditButtonSelected
    );

    const todoInput = screen.getByRole('textbox');
    const addIcon = screen.getByTestId('submitBtn');
    fireEvent.change(todoInput, {
      target: { value: 'todoContent 예시3 : 노랑' },
    });
    fireEvent.click(addIcon);

    expect(dispatch).toBeCalledTimes(2);
  });
});
