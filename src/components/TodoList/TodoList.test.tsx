import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TodoList from './TodoList';

import { TOGGLE_PAGE } from '../../modules/PageToggleReducer';

import todos from '../../../fixtures/todos';

jest.mock('react-redux');

describe('<TodoList/>', () => {
  const dispatch = jest.fn();
  //@ts-ignore
  useDispatch.mockImplementation(() => dispatch);

  //@ts-ignore
  useSelector.mockImplementation((selector) =>
    selector({
      todo: todos,
    })
  );

  //@ts-ignore
  useSelector.mockImplementation((selector) =>
    selector({
      pageToggle: false,
    })
  );

  render(<TodoList />);

  it('properly mocked useSelector, useDispatch and correct action was called', () => {
    const toggleButton = screen.getByRole('button');

    fireEvent.click(toggleButton);
    expect(dispatch).toBeCalledWith({
      type: TOGGLE_PAGE,
    });
  });
});
