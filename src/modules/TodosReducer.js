const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const DELETE_TODO = 'todos/DELETE_TODO';
const EDIT_TODO = 'todos/EDIT_TODO';

let todoID = 1; //이렇게 전역변수보단 map할때 length나 이런값들 이용해서 할당해주기

export const addTodo = (todoContent, todoFilter) => ({
    type: ADD_TODO,
    todo: {
        id: todoID++,
        todoContent,
        todoFilter,
        done: false
    }
});

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id
});

export const editTodo = (id) => ({
    type: EDIT_TODO,
    id
})

const initialState = [
    //다음과 같이 구성된 객체를 이 배열안에 넣을 것
    /*
    {
        id:1,
        todoContent:'예시',
        todoFilter:'색',
        done:false
    }
    
    */
]

const TodosReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case ADD_TODO:
            return state.concat(action.todo);
        case TOGGLE_TODO:
            return state.map(
                todo =>
                    todo.id === action.id
                        ? { ...todo, done: !todo.done }
                        : todo
            );
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case EDIT_TODO:
            return state.filter(todo => todo.id === action.id);
        default:
            return state;
    }
}
export default TodosReducer;
