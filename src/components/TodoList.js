import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Header from "./Header";
import TodoItem from "./TodoItem";
import RemainTodoList from './RemainTodoList';
import { addTodo, toggleTodo, deleteTodo, editTodo } from "../modules/TodosReducer";


const BroomIcon = styled.img`
width:24px;
height:24px;
margin-right:16px;
`;

const ColorFilterRow = styled.div`
display:flex;
width:224px;
justify-content:space-around;
margin-left:10px;
`;

const ColorFilter = styled.div`
width:24px;
height:24px;
border-radius:50%;
border:${(props) => (props.selected ? '2px solid black' : 'none')};
`;

const Row = styled.div`
width:100%;
display:flex;
justify-content:space-between;
padding:15px 0;
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
margin-left:16px;
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
    const [colorFilterSelected, setColorFilterSelected] = useState([false, false, false, false, false, false]);
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
        if (colorFilterSelected.every((element) => element === false)) alert('색 필터를 설정해주세요!');
        else if (todoContent === '') alert('내용을 입력해주세요!');
        else {
            onAddTodo(todoContent, colorFilter);
            setTodoContent('');
            setColorFilterSelected([false, false, false, false, false, false]);
            setColorFilter('');
            setToggleButtonSelected(false);
        }
    }

    const handleColorFilterButton = (e) => {
        const { target: { style: { backgroundColor } } } = e;
        setColorFilter(backgroundColor);
        if (backgroundColor === `rgb(255, 175, 176)`) {
            colorFilterSelected[0] ? setColorFilterSelected([false, false, false, false, false, false]) : setColorFilterSelected([true, false, false, false, false, false]);
        }
        else if (backgroundColor === `rgb(255, 194, 130)`) {
            colorFilterSelected[1] ? setColorFilterSelected([false, false, false, false, false, false]) : setColorFilterSelected([false, true, false, false, false, false]);
        }
        else if (backgroundColor === `rgb(252, 255, 176)`) {
            colorFilterSelected[2] ? setColorFilterSelected([false, false, false, false, false, false]) : setColorFilterSelected([false, false, true, false, false, false]);
        }
        else if (backgroundColor === `rgb(226, 255, 175)`) {
            colorFilterSelected[3] ? setColorFilterSelected([false, false, false, false, false, false]) : setColorFilterSelected([false, false, false, true, false, false]);
        }
        else if (backgroundColor === `rgb(174, 228, 255)`) {
            colorFilterSelected[4] ? setColorFilterSelected([false, false, false, false, false, false]) : setColorFilterSelected([false, false, false, false, true, false]);
        }
        else if (backgroundColor === `rgb(181, 199, 237)`) {
            colorFilterSelected[5] ? setColorFilterSelected([false, false, false, false, false, false]) : setColorFilterSelected([false, false, false, false, false, true]);
        }
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
                        <ColorFilterRow>
                            <ColorFilter style={{ backgroundColor: '#ffafb0' }} selected={colorFilterSelected[0]} onClick={handleColorFilterButton}></ColorFilter>
                            <ColorFilter style={{ backgroundColor: '#ffc282' }} selected={colorFilterSelected[1]} onClick={handleColorFilterButton}></ColorFilter>
                            <ColorFilter style={{ backgroundColor: '#fcffb0' }} selected={colorFilterSelected[2]} onClick={handleColorFilterButton}></ColorFilter>
                            <ColorFilter style={{ backgroundColor: '#e2ffaf' }} selected={colorFilterSelected[3]} onClick={handleColorFilterButton}></ColorFilter>
                            <ColorFilter style={{ backgroundColor: '#aee4ff' }} selected={colorFilterSelected[4]} onClick={handleColorFilterButton}></ColorFilter>
                            <ColorFilter style={{ backgroundColor: '#b5c7ed' }} selected={colorFilterSelected[5]} onClick={handleColorFilterButton}></ColorFilter>
                        </ColorFilterRow>
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


