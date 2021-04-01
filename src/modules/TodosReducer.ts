export const ADD_TODO = 'todos/ADD_TODO';
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const DELETE_TODO = 'todos/DELETE_TODO';
export const EDIT_TODO = 'todos/EDIT_TODO';

let todoID = 1;
export interface Todo {
  id: number;
  todoContent: string;
  todoColor: string;
  done: boolean;
}
interface AddTodoAction {
  type: typeof ADD_TODO;
  todo: Todo;
}
interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  id: number;
}
interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  id: number;
}
interface EditTodoAction {
  type: typeof EDIT_TODO;
  todo: Todo;
}

export type TodoActionTypes =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction;

export const addTodo = (
  todoContent: string,
  todoColor: string
): AddTodoAction => ({
  type: ADD_TODO,
  todo: {
    id: todoID++,
    todoContent,
    todoColor,
    done: false,
  },
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  id,
});

export const deleteTodo = (id: number): DeleteTodoAction => ({
  type: DELETE_TODO,
  id,
});

export const editTodo = (
  id: number,
  todoContent: string,
  todoColor: string
): EditTodoAction => ({
  type: EDIT_TODO,
  todo: {
    id,
    todoContent,
    todoColor,
    done: false,
  },
});

const initialState: Todo[] = [];

const TodosReducer = (
  state = initialState,
  action: TodoActionTypes
): Todo[] => {
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
