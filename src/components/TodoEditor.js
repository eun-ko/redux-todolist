import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './Header';
import TodoColorRadioButton from './TodoColorRadioButton';
import broomIcon from '../assets/Icons/broomIcon.png';

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

const TodoEditor=({text,title,handleButton,colorFilter,setColorFilter,todoContent,handleTodoInput,handleToggleButton,selectedTodo})=>{
    return(
        <Wrapper>
            <Header text={text}></Header>
            <Row>
                <Title>{title}</Title>
                <AddButton onClick={handleButton}>{text}</AddButton>
            </Row>
            <Row>
                <TodoColorRadioButton {...{ colorFilter }} {...{ setColorFilter }} {...{selectedTodo}}/>
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
    handleButton: PropTypes.func,
    colorFilter: PropTypes.string,
    setColorFilter: PropTypes.func,
    todoContent: PropTypes.string,
    handleTodoInput: PropTypes.func,
    handleToggleButton: PropTypes.func,
    selectedTodo:PropTypes.object
}