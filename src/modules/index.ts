import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import PageToggleReducer from './PageToggleReducer';

export type RootState=ReturnType< typeof rootReducer>;

const rootReducer = combineReducers({
  todo:TodosReducer,
  pageToggle:PageToggleReducer,
});

export default rootReducer;
