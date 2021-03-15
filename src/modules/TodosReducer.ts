const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const DELETE_TODO = 'todos/DELETE_TODO';
const EDIT_TODO = 'todos/EDIT_TODO';

let todoID = 1;

interface Todo{
  id:number;
  todoContent:string;
  todoColor:string;
  done:boolean;
}

export const addTodo = (todoContent:string, todoColor:string) => ({
  type: ADD_TODO,
  todo: {
    id: todoID++,
    todoContent,
    todoColor,
    done: false,
  },
});

export const toggleTodo = (id:number) => ({
  type: TOGGLE_TODO,
  id,
});

export const deleteTodo = (id:number) => ({
  type: DELETE_TODO,
  id,
});

export const editTodo = (id:number, todoContent:string, todoColor:string) => ({
  type: EDIT_TODO,
  todo: {
    id,
    todoContent,
    todoColor,
    done: false,
  },
});

const initialState : Todo[]=[
  //다음과 같이 구성된 객체
  /*
    {
        id:1,
        todoContent:'예시',
        todoColor:'색',
        done:false
    }
    
    */
];

const TodosReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case ADD_TODO: {
      return state.concat(action.todo);
    }

    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.todo.id
          ? {
              ...todo,
              id: action.todo.id,
              todoContent: action.todo.todoContent,
              todoColor: action.todo.todoColor,
              done: false,
            }
          : todo
      );

    default:
      return state;
  }
};
export default TodosReducer;
