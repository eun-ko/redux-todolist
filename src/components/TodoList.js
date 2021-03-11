import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Header from "./Header";
import TodoItem from "./TodoItem";
import RemainTodoList from './RemainTodoList';
import TodoEditor from './TodoEditor';
import { addTodo, toggleTodo, deleteTodo, editTodo } from "../modules/TodosReducer";
import TODOCOLORS from '../constants/TodoColorList';

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
    const [todoContent, setTodoContent] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [toggleButtonSelected, setToggleButtonSelected] = useState(false);
    const [editButtonSelected,setEditButtonSelected]=useState(false);
    const [selectedTodoID,setSelectedTodoID]=useState(0);
    const [selectedTodoColor,setSelectedTodoColor]=useState('');

    const todos = useSelector(state => state);
    const dispatch = useDispatch();

    const onAddTodo = (todoContent, todoFilter) => dispatch(addTodo(todoContent, todoFilter));
    
    const onToggleTodo = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]);
    
    const onDeleteTodo = (id,todoColor) =>  {
        const selectedTodoColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===todoColor);
        selectedTodoColor.count-=1;
        return dispatch(deleteTodo(id,todoColor))};
    
     const onEditTodo = (id,todoContent,todoFilter) => {
        return dispatch(editTodo(id,todoContent,todoFilter))};

    const handleTodoInput = e => setTodoContent(e.target.value);

    const handleToggleButton = () => {
        setToggleButtonSelected(!toggleButtonSelected);
    }

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
        onEditTodo(selectedTodoID,todoContent,colorFilter);
        setTodoContent('');
        setColorFilter('');        

        setEditButtonSelected(false);
        setToggleButtonSelected(false);

        const originalTodoColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===selectedTodoColor);
        originalTodoColor.count-=1;
        
        const editedTodoColor=TODOCOLORS.find((todoColorConstant)=>todoColorConstant.hex===colorFilter);
        editedTodoColor.count+=1; 
    }

    return (
        <>
            {toggleButtonSelected 
                ?
                <>
                    {editButtonSelected ?
                    <TodoEditor text="수정하기" title="Edit Todo" handleButton={handleEditButton} {...{colorFilter}} {...{setColorFilter}} {...{todoContent}} {...{handleTodoInput}} {...{handleToggleButton}}/>
                    : 
                    <TodoEditor text="추가하기" title="Add Todo" handleButton={handleAddButton} {...{colorFilter}} {...{setColorFilter}} {...{todoContent}} {...{handleTodoInput}} {...{handleToggleButton}}/>
                    }   
                </> 
                :
                <Wrapper>
                    <Header text='투-두 리스트' />
                    <RemainTodoList {...{ todos }} />
                    <>
                        {todos.map(todo => (
                            <TodoItem key={todo.id} {...{ todo }} {...{ onToggleTodo }} {...{onDeleteTodo}} {...{setToggleButtonSelected}} {...{editButtonSelected}} {...{setEditButtonSelected}} {...{selectedTodoID}} {...{setSelectedTodoID}}  {...{setSelectedTodoColor}}/>
                        ))}
                    </>
                    <ToggleButton onClick={handleToggleButton}>+</ToggleButton>
                </Wrapper>
            }
            </>
    );
}


