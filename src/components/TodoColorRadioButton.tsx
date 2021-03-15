import React from 'react';
import styled from 'styled-components';

import TODOCOLORS from '../constants/TodoColorList';
import {Todo} from "../modules/TodosReducer";

interface IProps {
  colorFilter:string;
  setColorFilter:React.Dispatch<React.SetStateAction<string>>;
  selectedTodo:Todo
}

const ColorFilterRow = styled.div`
  display: flex;
  width: 224px;
  justify-content: space-between;
`;

const Label = styled.label`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ColorFilter = styled.input`
  display: none;
  &:checked + ${Label} {
    background-color: ${(props) => props.color};
    border: ${(props) => (props.checked ? '2px solid black' : 'none')};
  }
`;

const TodoColorRadioButton:React.FC<IProps> = ({
  colorFilter,
  setColorFilter,
  selectedTodo,
}) => {
  const handleTodoColor = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const selectedColor= TODOCOLORS.find((color) => color.name === value);
    if(!selectedColor) return
    setColorFilter(selectedColor.hex);
    /*
    or
    if(selectedColor) setColorFilter(selectedColor.hex);
    */
  };

  return (
    <ColorFilterRow>
      {TODOCOLORS.map((color) => (
        <div key={color.name}>
          <ColorFilter
            id={color.name}
            type="radio"
            name="color-selector"
            value={color.name}
            color={color.hex}
            checked={
              (selectedTodo && color.hex === selectedTodo.todoColor) ||
              color.hex === colorFilter
            }
            onChange={handleTodoColor}
          />
          <Label htmlFor={color.name} color={color.hex} ></Label>
        </div>
      ))}
    </ColorFilterRow>
  );
};

export default TodoColorRadioButton;

