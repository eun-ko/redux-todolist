const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const DELETE_TODO = 'todos/DELETE_TODO';
const EDIT_TODO = 'todos/EDIT_TODO';

let todoID = 1;

export const addTodo = (todoContent, todoColor) => ({
    type: ADD_TODO,
    todo: {
        id: todoID++,
        todoContent,
        todoColor,
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
    //다음과 같이 구성된 객체
    /*
    {
        id:1,
        todoContent:'예시',
        todoColor:'색',
        done:false
    }
    
    */
]

const TodosReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case ADD_TODO:
            {
                console.log(action.todo);
                return state.concat(action.todo);
            }

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
            return {
                ...state
            }
        /*{
            console.log(action.todo);
            const a = state.findIndex(todo => todo.id === action.id);
            state[a] = action.todo;
            return state;
        }*/

        default:
            return state;
    }
}
export default TodosReducer;
