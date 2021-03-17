import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addTodo, editTodo } from '../modules/TodosReducer';
import { togglePage } from '../modules/PageToggleReducer';
import { Todo } from '../modules/TodosReducer';

import Header from './Header';
import TodoColorRadioButton from './TodoColorRadioButton';

import broomIcon from '../assets/Icons/broomIcon.png';

import TODOCOLORS from '../constants/TodoColorList';

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

const Wrapper = styled.form`
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

interface IProps {
  text: string;
  title: string;
  selectedTodo: Todo;
  setEditButtonSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoEditor: React.FC<IProps> = ({
  text,
  title,
  selectedTodo,
  setEditButtonSelected,
}) => {
  const dispatch = useDispatch();

  const [todoContent, setTodoContent] = useState(
    text === '추가하기' ? '' : selectedTodo.todoContent
  );
  const [todoColor, setTodoColor] = useState(
    text === '추가하기' ? '' : selectedTodo.todoColor
  );

  const onAddTodo = (todoContent: string, todoColor: string) => {
    dispatch(addTodo(todoContent, todoColor));
  };

  const onEditTodo = ({
    id,
    todoContent,
    todoColor,
  }: {
    id: number;
    todoContent: string;
    todoColor: string;
  }) => {
    if (todoContent === '' && todoColor === '') {
      return dispatch(
        editTodo(id, selectedTodo.todoContent, selectedTodo.todoColor)
      );
    }
    if (todoContent === '') {
      return dispatch(editTodo(id, selectedTodo.todoContent, todoColor));
    }
    if (todoColor === '') {
      return dispatch(editTodo(id, todoContent, selectedTodo.todoColor));
    }
    return dispatch(editTodo(id, todoContent, todoColor));
  };

  const handlePageToggle = () => dispatch(togglePage());

  const handleAddButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (todoColor === '' || todoContent === '') {
      alert('내용과 색을 모두 지정해주세요');
      e.preventDefault();
    }
    if (todoColor) {
      const selectedColor = TODOCOLORS.find(
        (todoColorConstant) => todoColorConstant.hex === todoColor
      );
      if (selectedColor) selectedColor.count += 1;
    }
    if (todoColor !== '' && todoContent !== '') {
      onAddTodo(todoContent, todoColor);
      setTodoContent('');
      setTodoColor('');
      handlePageToggle();
    }
  };

  const handleEditButton = () => {
    const originalTodoColor = TODOCOLORS.find(
      (todoColorConstant) => todoColorConstant.hex === selectedTodo.todoColor
    );
    if (originalTodoColor) originalTodoColor.count -= 1;

    const editedTodoColor = TODOCOLORS.find(
      (todoColorConstant) => todoColorConstant.hex === todoColor
    );
    if (editedTodoColor) editedTodoColor.count += 1;

    onEditTodo({ id: selectedTodo.id, todoContent, todoColor });

    setTodoContent('');
    setTodoColor('');

    setEditButtonSelected(false);
    handlePageToggle();
  };

  const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  return (
    <Wrapper>
      <Header text={text}></Header>
      <Row>
        <Title>{title}</Title>
        <AddButton
          onClick={text === '추가하기' ? handleAddButton : handleEditButton}
          type="submit"
        >
          {text}
        </AddButton>
      </Row>
      <Row>
        <TodoColorRadioButton
          todoColor={todoColor}
          setTodoColor={setTodoColor}
          selectedTodo={selectedTodo}
        />
        <BroomIcon src={broomIcon} />
      </Row>
      <Input
        defaultValue={text === '수정하기' ? selectedTodo.todoContent : ''}
        onChange={handleTodoInput}
        autoFocus
      />
      <ToggleButton onClick={handlePageToggle}>-</ToggleButton>
    </Wrapper>
  );
};
export default TodoEditor;
