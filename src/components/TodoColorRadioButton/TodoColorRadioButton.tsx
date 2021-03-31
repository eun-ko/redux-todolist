import React from 'react';
import styled from 'styled-components';

import TODOCOLORS from '../../constants/TodoColorList';

const ColorRadioRow = styled.div`
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

const ColorRadio = styled.input`
  display: none;
  &:checked + ${Label} {
    border: ${(props) => (props.checked ? '2px solid black' : 'none')};
  }
`;

interface IProps {
  todoColor: string;
  setTodoColor: React.Dispatch<React.SetStateAction<string>>;
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
    /*
    or
    if(selectedColor) setTodoColor(selectedColor.hex);
    */
  };

  return (
    <ColorRadioRow>
      {TODOCOLORS.map((color) => (
        <div key={color.name}>
          <ColorRadio
            data-testid={color.hex}
            id={color.name}
            name={color.name}
            type="radio"
            value={color.name}
            checked={color.hex === todoColor}
            onChange={handleTodoColor}
          />
          <Label
            data-testid={color.name}
            htmlFor={color.name}
            color={color.hex}
          ></Label>
        </div>
      ))}
    </ColorRadioRow>
  );
};

export default TodoColorRadioButton;
