import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

import TODOCOLORS from "../constants/TodoColorList";

const ColorFilterRow = styled.div`
display:flex;
width:224px;
justify-content:space-between;
`;

const Label = styled.label`
display:inline-block;
width:24px;
height:24px;
border-radius:50%;
background-color:${(props) => props.color};
`;


const ColorFilter = styled.input`
display:none;
&:checked + ${Label} {
    background-color: ${(props) => props.color};
    border:${(props) => (props.checked ? '2px solid black' : 'none')};
}
`;


const TodoColorRadioButton = ({ colorFilter, setColorFilter }) => {

    const handleTodoColor = (e) => {
        const { value } = e.target;
        const selected = TODOCOLORS.filter((color) => color.name === value); //새 배열 반환
        if (selected) {
            setColorFilter(selected[0].hex);
        }
    }
    return (
        <ColorFilterRow>
            {TODOCOLORS.map((color) => (
                <div key={color.name}>
                    <ColorFilter id={color.name} type="radio" name="color-selector" value={color.name} color={color.hex} checked={color.hex === colorFilter} onChange={handleTodoColor} />
                    <Label htmlFor={color.name} color={color.hex}></Label>
                </div>
            ))}
        </ColorFilterRow>

    )
}

export default TodoColorRadioButton;

TodoColorRadioButton.propTypes = {
    colorFilter: PropTypes.string,
    setColorFilter: PropTypes.func,
}