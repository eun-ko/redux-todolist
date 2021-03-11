import React from 'react';
import {  useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import editIcon from '../assets/Icons/editIcon.png';
import deleteIcon from '../assets/Icons/deleteIcon.png';
import checkIcon from '../assets/Icons/checkIcon.png';
import { toggleTodo,deleteTodo } from "../modules/TodosReducer";
import TODOCOLORS from '../constants/TodoColorList';

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

const TodoItem = ({ todo,setToggleButtonSelected,editButtonSelected,setEditButtonSelected,setSelectedTodo }) => {

    const dispatch = useDispatch();

    const onToggleTodo = (id) => dispatch(toggleTodo(id));
    
    const onDeleteTodo = (id,todoColor) =>  {
        const selectedTodoColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===todoColor);
        selectedTodoColor.count-=1;
        dispatch(deleteTodo(id,todoColor))
    };

    const handleEditIcon=(e)=>{
        e.preventDefault();
        setSelectedTodo(todo);
        setToggleButtonSelected(true);
        setEditButtonSelected(!editButtonSelected);
    }
   
    return (
        <TodoWrapper done={todo.done}>
            <TodoFilter todoColor={todo.todoColor}></TodoFilter>
            <TodoRow>
                <TodoContent onClick={() => onToggleTodo(todo.id)}>{todo.todoContent}</TodoContent>
                <EditIcon src={editIcon} onClick={handleEditIcon} />
            </TodoRow>
            {todo.done &&
                <IconRow>
                    <DeleteIcon src={deleteIcon} onClick={() => onDeleteTodo(todo.id,todo.todoColor)} />
                    <CheckIcon src={checkIcon} />
                </IconRow>
            }
        </TodoWrapper>
    )
}
export default TodoItem;

TodoItem.propTypes = {
    todo: PropTypes.object,
    onToggleTodo: PropTypes.func,
    onDeleteTodo: PropTypes.func,
    setToggleButtonSelected: PropTypes.func,
    editButtonSelected: PropTypes.bool,
    setEditButtonSelected: PropTypes.func,
    setSelectedTodoID: PropTypes.func,
    setSelectedTodoColor: PropTypes.func,
    setSelectedTodo:PropTypes.func
    
}
