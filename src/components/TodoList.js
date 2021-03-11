import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from "./Header";
import TodoItem from "./TodoItem";
import RemainTodoList from './RemainTodoList';
import TodoEditor from './TodoEditor';

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

const Wrapper = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
justify-content:space-between;
`;


export default function TodoList() {
    const [toggleButtonSelected, setToggleButtonSelected] = useState(false);
    const [editButtonSelected,setEditButtonSelected]=useState(false);
    const [selectedTodo,setSelectedTodo]=useState();

    const todos = useSelector(state => state);

    const handleToggleButton = () => {
        setToggleButtonSelected(!toggleButtonSelected);
    }

    return (
        <>
            {toggleButtonSelected 
                ?
                <>
                    {editButtonSelected ?
                    <TodoEditor text="수정하기" title="Edit Todo" handleToggleButton={handleToggleButton} selectedTodo={selectedTodo} setToggleButtonSelected={setToggleButtonSelected} setEditButtonSelected={setEditButtonSelected} />
                    : 
                    <TodoEditor text="추가하기" title="Add Todo"  handleToggleButton={handleToggleButton} selectedTodo={selectedTodo} setToggleButtonSelected={setToggleButtonSelected} setEditButtonSelected={setEditButtonSelected} />
                    }   
                </> 
                :
                <Wrapper>
                    <Header text='투-두 리스트' />
                    <RemainTodoList todos={todos} /> 
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo}  setToggleButtonSelected={setToggleButtonSelected} editButtonSelected={editButtonSelected} setEditButtonSelected={setEditButtonSelected} setSelectedTodo={setSelectedTodo}/>
                    ))}
                    <ToggleButton onClick={handleToggleButton}>+</ToggleButton>
                </Wrapper>
            }
            </>

    );
}


