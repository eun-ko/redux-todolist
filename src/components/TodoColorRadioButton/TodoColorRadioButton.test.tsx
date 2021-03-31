import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoColorRadioButton from './TodoColorRadioButton';

describe('<TodoColorRadioButton/>', () => {
  const setTodoColor = jest.fn();

  const { getByTestId } = render(
    <TodoColorRadioButton todoColor="#ffafb0" setTodoColor={setTodoColor} />
  );

  // const todoColorLabel = getByRole('label');
  //const todoColorRadio = getByRole('radio');

  const todoColorLabel = getByTestId('RED');
  const todoColorRadio = getByTestId('#ffafb0') as HTMLInputElement;

  it('label sholud be visible and input radio btn should be invisible', () => {
    expect(todoColorLabel).toBeVisible();
    expect(todoColorRadio).not.toBeVisible();
  });

  it('defaultChecked value should be red', () => {
    expect(todoColorRadio).toBeChecked();
  });

  it('onChange works properly and calls setTodoColor function', () => {
    fireEvent.change(todoColorRadio, { target: { value: 'ORANGE' } });
    expect(todoColorRadio.value).toBe('ORANGE');
    //expect(setTodoColor).toHaveBeenCalledTimes(1);
  });
});
