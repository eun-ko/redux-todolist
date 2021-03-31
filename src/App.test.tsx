import React from 'react';
import { render } from '@testing-library/react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import rootReducer from './modules';

const store = createStore(rootReducer);

describe('<App/>', () => {
  test('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
