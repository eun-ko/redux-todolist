import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
            if (todo.todoFilter === 'rgb(255, 175, 176)') red++;
            else if (todo.todoFilter === "rgb(255, 194, 130)") orange++;
            else if (todo.todoFilter === "rgb(252, 255, 176)") yellow++;
            else if (todo.todoFilter === "rgb(226, 255, 175)") green++;
            else if (todo.todoFilter === "rgb(174, 228, 255)") blue++;
            else if (todo.todoFilter === "rgb(181, 199, 237)") purple++;
        })
    }
    countTodoByColors();
    return (
        <RemainTodoWrapper>
            <RemainTitle>남은 TO-DO {todos.length}개</RemainTitle>
            <ColorWrapper>
                <Color style={{ backgroundColor: '#ffafb0' }}></Color> {red}개
                <Color style={{ backgroundColor: '#ffc282' }} ></Color> {orange}개
                <Color style={{ backgroundColor: '#fcffb0' }} ></Color> {yellow}개
                <Color style={{ backgroundColor: '#e2ffaf' }} ></Color> {green}개
                <Color style={{ backgroundColor: '#aee4ff' }} ></Color> {blue}개
                <Color style={{ backgroundColor: '#b5c7ed' }} ></Color> {purple}개
            </ColorWrapper>
        </RemainTodoWrapper>
    )

}
export default RemainTodoList;

RemainTodoList.propTypes = {
    todos: PropTypes.object
}


