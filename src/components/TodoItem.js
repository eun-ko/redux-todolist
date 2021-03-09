import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DeleteIcon = styled.img`
width:14px;
margin-right:13px;
`;

const TodoWrapper = styled.div`
width:100%;
height:52px;
padding:0 12px 0 0 ;
display:flex;
border-bottom:1px solid #e5e5e5;
text-decoration:${(props) => (props.done ? 'line-through' : 'none')};
color:${(props) => (props.done ? '#c6c4c4' : 'black')};
&:hover{
    cursor:pointer;
}

`;

const TodoFilter = styled.div`
width:12px;
height:100%;
background-color:${(props) => (props.todoColor)};
`;

const TodoContent = styled.p`
font-size:16px;
margin-left:12px;
display:flex;
align-items:center;
`;

const EditIcon = styled.img`
width:18px;
margin-left:7px;
`;

const IconRow = styled.div`
display:flex;
align-items:center;
width:15%;
`;

const CheckIcon = styled.img`
width:20px;
`;

const TodoRow = styled.div`
width:85%;
display:flex;
align-items:center;
`;

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }) => {
    return (
        <TodoWrapper done={todo.done}>
            <TodoFilter todoColor={todo.todoColor}></TodoFilter>
            <TodoRow>
                <TodoContent onClick={() => onToggleTodo(todo.id)}>{todo.todoContent}</TodoContent>
                <EditIcon src='../assets/Icons/editIcon.png' />
            </TodoRow>
            {todo.done &&
                <IconRow>
                    <DeleteIcon src='../assets/Icons/deleteIcon.png' onClick={() => onDeleteTodo(todo.id)} />
                    <CheckIcon src='../assets/Icons/checkIcon.png' />
                </IconRow>
            }
        </TodoWrapper>
    )
}
export default TodoItem;

TodoItem.propTypes = {
    todo: PropTypes.object,
    onToggleTodo: PropTypes.func,
    onDeleteTodo: PropTypes.func
}
