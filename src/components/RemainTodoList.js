import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TODOCOLORS from "../constants/TodoColorList";

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

const ColorWrapper = styled.div`
display:flex;
align-items:center;
margin-left:6px;
margin-bottom:12px;
`;

const RemainTodoList = ({ todos }) => {
    const [colorCounts, setColors] = useState([]);

    useEffect(() => {
        countTodoByColors();
    }, [colorCounts]);


    const countTodoByColors = () => {
        //console.log(todos);
        todos.map((todo) => {
            console.log('colorCounts', colorCounts);
            const exists = colorCounts.find((color) => color.name === todo.todoColor);
            if (exists) {
                exists.count += 1;
            } else {
                console.log('해당 컬러가 아직 존재하지 않음');
                colorCounts.push({ name: todo.todoColor, count: 1 });
            }
            setColors(colorCounts);
        })
    }

    return (
        <RemainTodoWrapper>
            <RemainTitle>남은 TO-DO {todos.length}개</RemainTitle>
            <ColorWrapper>
                {TODOCOLORS.map((todoColorConstant, index) => {
                    console.log('index', index);
                    console.log('colorCounts in TODOCOLORS map', colorCounts);
                    const count = colorCounts.find((colorCount) => {
                        console.log('colorCounts find start');
                        console.log('colorCounts.name', colorCount.name);
                        console.log('TODOCOLORS.hex', todoColorConstant.hex);
                        return colorCount.name === todoColorConstant.hex;
                    }
                    );
                    console.log('count', count);
                    return (
                        <>
                            <Color key={todoColorConstant.name} backgroundColor={todoColorConstant.hex} /> {count ? count.count : 0}개
                        </>
                    )
                })
                }
            </ColorWrapper>

        </RemainTodoWrapper>
    )

}
export default RemainTodoList;

RemainTodoList.propTypes = {
    todos: PropTypes.object
}


