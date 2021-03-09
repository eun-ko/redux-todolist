import React from 'react';
import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import TodoList from "../src/components/TodoList";

const Wrapper = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;

margin: 0 auto;

max-width:375px;
min-height:812px;

box-shadow:0 0 1rem 0 rgba(0, 0, 0, 0.1);
`;

function App() {
  return (
    <Wrapper>
      <TodoList />
      <GlobalStyles />
    </Wrapper>
  );
}

export default App;

