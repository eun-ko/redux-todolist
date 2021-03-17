import React from 'react';
import styled from 'styled-components';

import TODOCOLORS from '../constants/TodoColorList';
import { Todo } from '../modules/TodosReducer';

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

interface IProps {
  todoColor: string;
  setTodoColor: React.Dispatch<React.SetStateAction<string>>;
  selectedTodo: Todo;
}

const TodoColorRadioButton: React.FC<IProps> = ({
  todoColor,
  setTodoColor,
}) => {
  const handleTodoColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const selectedColor = TODOCOLORS.find((color) => color.name === value);
    if (!selectedColor) return;
    setTodoColor(selectedColor.hex);
    //console.log('todoColor', todoColor); //여기서 바로 적용안됨
    /*
    or
    if(selectedColor) setTodoColor(selectedColor.hex);
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
            checked={color.hex === todoColor}
            onChange={handleTodoColor}
          />
          <Label htmlFor={color.name} color={color.hex}></Label>
        </div>
      ))}
    </ColorFilterRow>
  );
};

export default TodoColorRadioButton;
