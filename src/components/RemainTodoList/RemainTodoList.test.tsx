import React from 'react';
import { render, screen } from '@testing-library/react';

import { useSelector } from 'react-redux';

import RemainTodoList from './RemainTodoList';

import todos from '../../../fixtures/todos';

jest.mock('react-redux');

test("RemainTodoList component properly rendered remaining todo's count by accessing store with useSelector", () => {
  //@ts-ignore
  useSelector.mockImplementation((selector) =>
    selector({
      todo: todos,
    })
  );
  render(<RemainTodoList />);

  //jest.mock한후에 provider로 감싸서 store 넘겨주면 'nothing was returned from render' 오류 발생
});
