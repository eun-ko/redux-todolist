import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from './Header';
import TodoItem from './TodoItem';
import RemainTodoList from './RemainTodoList';
import TodoEditor from './TodoEditor';

import { togglePage } from '../modules/PageToggleReducer';
import {Todo} from "../modules/TodosReducer";

const ToggleButton = styled.button`
  font-size: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 70px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function TodoList() {
  const [editButtonSelected, setEditButtonSelected] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({id:0,todoContent:'',todoColor:'',done:false});

  const dispatch = useDispatch();
  const todos = useSelector((state:RootStateOrAny) => state.TodosReducer);
  const toggleButtonSelected = useSelector((state:RootStateOrAny) => state.PageToggleReducer);

  const handlePageToggle = () => dispatch(togglePage());

  return toggleButtonSelected ? (
    <TodoEditor
      text={editButtonSelected ? '수정하기' : '추가하기'}
      title={editButtonSelected ? 'Edit Todo' : 'Add Todo'}
      selectedTodo={selectedTodo}
      setEditButtonSelected={setEditButtonSelected}
    />
  ) : (
    <Wrapper>
      <Header text="투-두 리스트" />
      <RemainTodoList todos={todos} />
      {todos.map((todo:Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editButtonSelected={editButtonSelected}
          setEditButtonSelected={setEditButtonSelected}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
      <ToggleButton onClick={handlePageToggle}>+</ToggleButton>
    </Wrapper>
  );
}
