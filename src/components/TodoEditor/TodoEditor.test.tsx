import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import TodoEditor from './TodoEditor';

import todos from '../../../fixtures/todos';

jest.mock('react-redux');

describe('<TodoEditor/>', () => {
  const dispatch = jest.fn();
  //@ts-ignore
  useDispatch.mockImplementation(() => dispatch);

  const setEditButtonSelected = jest.fn();

  window.alert = jest.fn();

  const { rerender } = render(
    <TodoEditor
      text="수정하기"
      title="example title"
      selectedTodo={todos[0]}
      setEditButtonSelected={setEditButtonSelected}
    />
  );

  it('내용과 색을 지정하지 않았을때 alert가 뜨는지 확인', async () => {
    const todoInput = screen.getByTestId('todoInput');

    await fireEvent.change(todoInput, { target: { value: '' } });
    rerender(
      <TodoEditor
        text="수정하기"
        title="example title"
        selectedTodo={todos[0]}
        setEditButtonSelected={setEditButtonSelected}
      />
    );
    expect(window.alert).toHaveBeenCalledWith('내용과 색을 모두 지정해주세요');
  });

  it('setEditButtonSelected 가 호출되는지 확인', () => {
    const editIcon = screen.getByTestId('addBtn');

    fireEvent.click(editIcon);
    expect(setEditButtonSelected).toHaveBeenCalledTimes(1);
  });
});
