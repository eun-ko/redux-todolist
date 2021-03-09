import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Header from "./Header";
import TodoItem from "./TodoItem";
import TodoColorRadioButton from "./TodoColorRadioButton";
import RemainTodoList from './RemainTodoList';
import { addTodo, toggleTodo, deleteTodo, editTodo } from "../modules/TodosReducer";


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



export default function TodoList() {
    const [todoContent, setTodoContent] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [toggleButtonSelected, setToggleButtonSelected] = useState(false);


    const todos = useSelector(state => state);
    const dispatch = useDispatch();

    const onAddTodo = (todoContent, todoFilter) => dispatch(addTodo(todoContent, todoFilter));
    const onToggleTodo = useCallback(id => dispatch(toggleTodo(id)), [dispatch]);
    const onDeleteTodo = (id) => dispatch(deleteTodo(id));
    const onEditTodo = (id) => dispatch(editTodo(id));



    const handleTodoInput = e => setTodoContent(e.target.value);

    const handleToggleButton = () => {
        setToggleButtonSelected(!toggleButtonSelected);
    }

    const handleAddButton = (e) => {
        e.preventDefault();
        onAddTodo(todoContent, colorFilter);
        setTodoContent('');
        setColorFilter('');
        setToggleButtonSelected(false);
    }

    return (
        <>
            {toggleButtonSelected ?
                <Wrapper>
                    <Header text="추가하기"></Header>
                    <Row>
                        <Title>Add Todo</Title>
                        <AddButton onClick={handleAddButton}>추가하기</AddButton>
                    </Row>
                    <Row>

                        <TodoColorRadioButton {...{ colorFilter }} {...{ setColorFilter }} />

                        <BroomIcon src="../assets/Icons/broomIcon.png" />
                    </Row>
                    <Input
                        value={todoContent}
                        onChange={handleTodoInput}
                    />
                    <ToggleButton onClick={handleToggleButton}>-</ToggleButton>
                </Wrapper>
                :
                <Wrapper>

                    <Header text='투-두 리스트' />
                    <RemainTodoList {...{ todos }} />
                    <>
                        {todos.map(todo => (
                            <TodoItem key={todo.id} {...{ todo }} {...{ onToggleTodo }} {...{ onDeleteTodo }} {...{ onEditTodo }} />
                        ))}
                    </>
                    <ToggleButton onClick={handleToggleButton}>+</ToggleButton>
                </Wrapper>
            }
        </>

    );
}


