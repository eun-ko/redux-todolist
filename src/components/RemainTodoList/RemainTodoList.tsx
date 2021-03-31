import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import TODOCOLORS from '../../constants/TodoColorList';

import { RootState } from '../../modules';

const RemainTodoWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
`;

const RemainTitle = styled.p`
  font-size: 14px;
  margin: 12px 0 10px 12px;
`;

const Color = styled.div<{ backgroundColor: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 6px;
  background-color: ${(props) => props.backgroundColor};
`;

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6px;
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
`;

const RemainTodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo);
  return (
    <RemainTodoWrapper>
      <RemainTitle>남은 TO-DO {todos.length}개</RemainTitle>
      <ColorWrapper>
        {TODOCOLORS.map((todoColorConstant) => (
          <Row key={todoColorConstant.name}>
            <Color backgroundColor={todoColorConstant.hex} />
            <span>{todoColorConstant.count}개</span>
          </Row>
        ))}
      </ColorWrapper>
    </RemainTodoWrapper>
  );
};
export default RemainTodoList;
