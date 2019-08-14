import { createAction, handleActions } from 'redux-actions';
import { actions as loadingActions } from './loading';
import api from '../../api';
import AsyncStorage from '@react-native-community/async-storage';

const constants = {
	load: 'user/load/fetch',
	set: 'user/set',
	update: 'user/update/fetch',
	clear: 'user/clear',
};

const actions = {
	load: createAction(constants.load, () => (
		// AsyncStorage.getItem('TOKEN').then((token) => {
		// 	api.users.getInfo(token);
		// })
		api.users.getInfo()
	)),
	set: createAction(constants.set),
	update: createAction(constants.update, data => (
		api.users.update(data)
	)),
	clear: createAction(constants.clear),
};

const modifiers = {
	load: dispatch => () => {
		dispatch(loadingActions.start(constants.load));
		dispatch(actions.load());
	},
	set: dispatch => user => dispatch(actions.set(user)),
	update: dispatch => (props) => {
		dispatch(loadingActions.start(constants.update));
		dispatch(actions.update(props));
	},
	clear: dispatch => () => dispatch(actions.clear()),
};

const reducer = handleActions({
	[constants.load]: (state, action) => action.payload,
	[constants.set]: (state, action) => action.payload,
	[constants.update]: (state, action) => ({ ...state, ...action.payload }),
	[constants.clear]: () => ({}),
}, {});

export default reducer;
export { constants, actions, modifiers };
