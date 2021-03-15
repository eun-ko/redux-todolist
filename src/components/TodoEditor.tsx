import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addTodo, editTodo } from '../modules/TodosReducer';
import { togglePage } from '../modules/PageToggleReducer';
import {Todo} from "../modules/TodosReducer";

import Header from './Header';
import TodoColorRadioButton from './TodoColorRadioButton';

import broomIcon from '../assets/Icons/broomIcon.png';

import TODOCOLORS from '../constants/TodoColorList';

interface IProps{
  text:string;
  title:string;
  selectedTodo:Todo;
  setEditButtonSelected:React.Dispatch<React.SetStateAction<boolean>>;
}

const BroomIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 16px;
`;

const Input = styled.input`
  width: 343px;
  height: 300px;
  border: 1px solid #c6c4c4;
  margin: 12px 16px;
  padding: 12px;
  border-radius: 5px;
`;

const Title = styled.p`
  font-size: 21px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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

const AddButton = styled.button`
  width: 68px;
  height: 24px;
  padding: 4px 8px;
  margin-right: 16px;
`;

const TodoEditor:React.FC<IProps> = ({ text, title, selectedTodo, setEditButtonSelected }) => {
  const [todoContent, setTodoContent] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  const dispatch = useDispatch();

  const onAddTodo = (todoContent:string, todoFilter:string) =>
    dispatch(addTodo(todoContent, todoFilter));
  const onEditTodo = (id:number, todoContent:string, todoFilter:string) =>
    dispatch(editTodo(id, todoContent, todoFilter));

  const handlePageToggle = () => dispatch(togglePage());

  const handleAddButton = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onAddTodo(todoContent, colorFilter);
    if (colorFilter) {
      const selectedColor = TODOCOLORS.find(
        (todoColorConstant) => todoColorConstant.hex === colorFilter
      );
      if(selectedColor) selectedColor.count += 1;
    }
    setTodoContent('');
    setColorFilter('');
    handlePageToggle();
  };

  const handleEditButton = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onEditTodo(selectedTodo.id, todoContent, colorFilter);
    setTodoContent('');
    setColorFilter('');

    setEditButtonSelected(false);
    handlePageToggle();

    const originalTodoColor = TODOCOLORS.find(
      (todoColorConstant) => todoColorConstant.hex === selectedTodo.todoColor
    );
    if(originalTodoColor) originalTodoColor.count -= 1;

    const editedTodoColor = TODOCOLORS.find(
      (todoColorConstant) => todoColorConstant.hex === colorFilter
    );
    if(editedTodoColor) editedTodoColor.count += 1;
  };

  const handleTodoInput = (e:React.ChangeEvent<HTMLInputElement>) => setTodoContent(e.target.value);

  return (
    <Wrapper>
      <Header text={text}></Header>
      <Row>
        <Title>{title}</Title>
        <AddButton
          onClick={text === '추가하기' ? handleAddButton : handleEditButton}
        >
          {text}
        </AddButton>
      </Row>
      <Row>
        <TodoColorRadioButton
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          selectedTodo={selectedTodo}
        />
        <BroomIcon src={broomIcon} />
      </Row>
      <Input
        defaultValue={selectedTodo ? selectedTodo.todoContent : todoContent}
        onChange={handleTodoInput}
      />
      <ToggleButton onClick={handlePageToggle}>-</ToggleButton>
    </Wrapper>
  );
};
export default TodoEditor;

