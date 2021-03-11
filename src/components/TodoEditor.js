import React,{useState} from 'react';
import {  useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './Header';
import TodoColorRadioButton from './TodoColorRadioButton';

import broomIcon from '../assets/Icons/broomIcon.png';

import { addTodo, editTodo } from "../modules/TodosReducer";
import TODOCOLORS from '../constants/TodoColorList';

const BroomIcon = styled.img`
width:24px;
height:24px;
margin-right:16px;
`;

const Row = styled.div`
width:100%;
display:flex;
justify-content:space-between;
padding:15px 16px;
`;

const Input = styled.input`
width:343px;
height:300px;
border:1px solid #c6c4c4;
margin:12px 16px;
padding:12px;
border-radius:5px;
`;

const Title = styled.p`
font-size:21px;
display:flex;
align-items:center;
`;

const Wrapper = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
justify-content:space-between;
`;

const ToggleButton = styled.button`
font-size:32px;
width:32px;
height:32px;
display:flex;
justify-content:center;
align-items:center;
margin:0 auto;
margin-top:70px;
`;

const AddButton = styled.button`
width:68px;
height:24px;
padding: 4px 8px;
margin-right:16px;
`;

const TodoEditor=({text,title,handleToggleButton,selectedTodo,setToggleButtonSelected,setEditButtonSelected})=>{

    const [todoContent, setTodoContent] = useState('');
    const [colorFilter, setColorFilter] = useState('');

    const dispatch = useDispatch();

    const onAddTodo = (todoContent, todoFilter) => dispatch(addTodo(todoContent, todoFilter));
    const onEditTodo = (id,todoContent,todoFilter) => dispatch(editTodo(id,todoContent,todoFilter));

    const handleAddButton = (e) => {
        e.preventDefault();
        onAddTodo(todoContent, colorFilter);
        if(colorFilter){
            const selectedColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===colorFilter)
            selectedColor.count+=1;
        }
        setTodoContent('');
        setColorFilter('');
        setToggleButtonSelected(false);
    }

    const handleEditButton=(e)=>{
        e.preventDefault();
        onEditTodo(selectedTodo.id,todoContent,colorFilter);
        setTodoContent('');
        setColorFilter('');        

        setEditButtonSelected(false);
        setToggleButtonSelected(false);

        const originalTodoColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===selectedTodo.todoColor);
        originalTodoColor.count-=1;
        
        const editedTodoColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===colorFilter);
        editedTodoColor.count+=1; 
    }

    const handleTodoInput = e => setTodoContent(e.target.value);

    return(
        <Wrapper>
            <Header text={text}></Header>
            <Row>
                <Title>{title}</Title>
                <AddButton onClick={text==='추가하기'?handleAddButton:handleEditButton}>{text}</AddButton>
            </Row>
            <Row>
                <TodoColorRadioButton colorFilter={colorFilter} setColorFilter={setColorFilter} selectedTodo={selectedTodo}/>
                <BroomIcon src={broomIcon} />
            </Row>
            <Input
                defaultValue={selectedTodo ? selectedTodo.todoContent : todoContent}
                onChange={handleTodoInput}
            />
            <ToggleButton onClick={handleToggleButton}>-</ToggleButton>               
        </Wrapper>
    )
}
export default TodoEditor;

TodoEditor.propTypes = {
    text: PropTypes.string,
    title:PropTypes.string,
    handleToggleButton: PropTypes.func,
    selectedTodo:PropTypes.object,
    setToggleButtonSelected: PropTypes.func,
    setEditButtonSelected: PropTypes.func
}