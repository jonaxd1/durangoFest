import { createAction } from 'redux-actions';

const constants = {
	start: 'loading/start',
};

const actions = {
	start: createAction(constants.start, action => action),
};

const modifiers = {
	start: dispatch => action => dispatch(actions.start(action)),
};

const reducer = (state = {}, action) => {
	const { type } = action;
	if (type === constants.start) {
		return { ...state, [action.payload]: true };
	}
	const matches = /\/fetch$/.exec(type);
	if (!matches) return state;
	return {
		...state,
		[type]: false,
	};
};

export default reducer;
export { constants, actions, modifiers };
