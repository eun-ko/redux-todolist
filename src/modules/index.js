import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import PageToggleReducer from './PageToggleReducer';

const rootReducer = combineReducers({
  TodosReducer,
  PageToggleReducer
});

export default rootReducer;