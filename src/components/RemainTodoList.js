import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TODOCOLORS } from "./TodoColorRadioButton";

const RemainTodoWrapper = styled.div`
width:100%;
border-bottom:1px solid #e5e5e5;
font-size:14px;
`;

const RemainTitle = styled.p`
font-size:14px;
margin:12px 0 10px 12px;
`;

const Color = styled.div`
width:16px;
height:16px;
border-radius:50%;
margin:0 6px;
background-color:${(props) => props.backgroundColor};
`;

const ColorCount = styled.div`
margin:12px;
`;

const ColorWrapper = styled.div`
display:flex;
align-items:center;
margin-left:6px;
margin-bottom:12px;
`;

const RemainTodoList = ({ todos }) => {
    console.log(todos);
    let red = 0;
    let orange = 0;
    let yellow = 0;
    let green = 0;
    let blue = 0;
    let purple = 0;

    const countTodoByColors = () => {
        todos.map((todo) => {
            if (todo.todoColor === TODOCOLORS[0].hex) red++;
            else if (todo.todoColor === TODOCOLORS[1].hex) orange++;
            else if (todo.todoColor === TODOCOLORS[2].hex) yellow++;
            else if (todo.todoColor === TODOCOLORS[3].hex) green++;
            else if (todo.todoColor === TODOCOLORS[4].hex) blue++;
            else if (todo.todoColor === TODOCOLORS[5].hex) purple++;
        })
    }

    countTodoByColors();

    return (
        <RemainTodoWrapper>
            <RemainTitle>남은 TO-DO {todos.length}개</RemainTitle>
            <ColorWrapper>
                {TODOCOLORS.map((color) => {
                    return (
                        <>
                            <Color key={color.name} backgroundColor={color.hex} />
                        </>
                    )
                })
                }

            </ColorWrapper>
            <ColorCount>{red}개 {orange}개 {yellow}개 {green}개{blue}개 {purple}개</ColorCount>
        </RemainTodoWrapper>
    )

}
export default RemainTodoList;

RemainTodoList.propTypes = {
    todos: PropTypes.object
}


