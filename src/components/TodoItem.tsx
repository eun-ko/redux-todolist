import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleTodo, deleteTodo } from '../modules/TodosReducer';
import { togglePage } from '../modules/PageToggleReducer';
import {Todo} from "../modules/TodosReducer";

import editIcon from '../assets/Icons/editIcon.png';
import deleteIcon from '../assets/Icons/deleteIcon.png';
import checkIcon from '../assets/Icons/checkIcon.png';

import TODOCOLORS from '../constants/TodoColorList';

const DeleteIcon = styled.img`
  width: 14px;
  margin-right: 13px;
`;

const TodoWrapper = styled.div<{done:boolean}>`
  width: 100%;
  height: 52px;
  padding: 0 12px 0 0;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
  color: ${(props) => (props.done ? '#c6c4c4' : 'black')};
  &:hover {
    cursor: pointer;
  }
`;

const TodoFilter = styled.div<{todoColor:string}>`
  width: 12px;
  height: 100%;
  background-color: ${(props) => props.todoColor};
`;

const TodoContent = styled.p`
  font-size: 16px;
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

const EditIcon = styled.img`
  width: 18px;
  margin-left: 7px;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
`;

const CheckIcon = styled.img`
  width: 20px;
`;

const TodoRow = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
`;

interface IProps{
  todo:Todo;
  editButtonSelected:boolean;
  setEditButtonSelected:React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodo:React.Dispatch<React.SetStateAction<Todo>>;
}

const TodoItem :React.FC<IProps> =({
  todo,
  editButtonSelected,
  setEditButtonSelected,
  setSelectedTodo,
}) => {
  const dispatch = useDispatch();

  const onToggleTodo = (id:number) => dispatch(toggleTodo(id));

  const onDeleteTodo = (id:number, todoColor:string) => {
    const selectedTodoColor = TODOCOLORS.find(
      (todoColorConstant) => todoColorConstant.hex === todoColor
    );
    if(selectedTodoColor) selectedTodoColor.count -= 1;
    dispatch(deleteTodo(id));
  };

  const handlePageToggle = () => dispatch(togglePage());

  const handleEditIcon = () => {
    setSelectedTodo(todo);
    handlePageToggle();
    setEditButtonSelected(!editButtonSelected);
  };

  return (
    <TodoWrapper done={todo.done}>
      <TodoFilter todoColor={todo.todoColor}></TodoFilter>
      <TodoRow>
        <TodoContent onClick={() => onToggleTodo(todo.id)}>
          {todo.todoContent}
        </TodoContent>
        <EditIcon src={editIcon} onClick={handleEditIcon} />
      </TodoRow>
      {todo.done && (
        <IconRow>
          <DeleteIcon
            src={deleteIcon}
            onClick={() => onDeleteTodo(todo.id, todo.todoColor)}
          />
          <CheckIcon src={checkIcon} />
        </IconRow>
      )}
    </TodoWrapper>
  );
};
export default TodoItem;
