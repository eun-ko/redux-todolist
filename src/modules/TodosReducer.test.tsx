import TodosReducer, {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} from './TodosReducer';

import todos from '../../fixtures/todos';

describe('<TodosReducer/>', () => {
  it('test addTodo action', () => {
    const state = TodosReducer(todos, addTodo('할일 추가 테스트', '#006cb7'));
    expect(state).toHaveLength(3);
  });

  it('test toggleTodo action', () => {
    const state = TodosReducer(todos, toggleTodo(1));
    expect(state[0].done).toBe(true);
  });

  it('test deleteTodo action', () => {
    const state = TodosReducer(todos, deleteTodo(1));
    expect(state).toHaveLength(1);
  });

  it('test editTodo action', () => {
    const state = TodosReducer(
      todos,
      editTodo(1, 'todoContent 예시1 : 빨강 -> 빠아아알강 으로 수정', '#b5c7ed')
    );
    expect(state[0].todoContent).toBe(
      'todoContent 예시1 : 빨강 -> 빠아아알강 으로 수정'
    );
    expect(state[0].todoColor).toBe('#b5c7ed');
    expect(state[0].id).toBe(1);
    expect(state[0].done).toBe(false);
  });
});
