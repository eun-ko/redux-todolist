import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';

test('Header component renders properly with text props', () => {
  const { getByText } = render(<Header text="example" />);
  const titleElement = getByText('example');
  expect(titleElement).toBeInTheDocument();
});
