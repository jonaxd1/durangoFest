import PromiseMiddleware from 'redux-promise';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import user, {
	modifiers as userModifiers,
	constants as userConstants,
} from './modules/user';
import loading, {
	modifiers as loadingModifiers,
	constants as loadingConstants,
} from './modules/loading';

const mainReducer = combineReducers({
	user,
	loading,
});

const constants = {
	user: userConstants,
};

const modifiers = {
	user: userModifiers,
};

const store = createStore(
	mainReducer,
	{},
	applyMiddleware(PromiseMiddleware),
);

export default store;
export { modifiers, constants };
