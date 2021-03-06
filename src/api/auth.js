import AsyncStorage from '@react-native-community/async-storage';
import request from '../utils/request';

function signin(params) {
	return request({
		url: '/signin/customers',
		params,
		method: 'POST',
	}).then((response) => {
		const { token, user, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return new Promise((res, rej) => {
			AsyncStorage.setItem('TOKEN', token, (err) => {
				if (err) return rej(err);
				return res({token, user});
			});
		});
	});
}

function signup(params) {
	return request({
		url: '/signup/customers',
		params,
		method: 'POST',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });

		return new Promise((res, rej) => {
			AsyncStorage.setItem('TOKEN', data, (err) => {
				if (err) return rej(err);
				return res(data);
			});
		});
	});
}

function signinSocial(params) {
	return request({
		url: '/signinsocial/customers',
		params,
		method: 'POST',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });

		return new Promise((res, rej) => {
			AsyncStorage.setItem('TOKEN', data, (err) => {
				if (err) return rej(err);
				return res(data);
			});
		});
	});
}

function signout() {
	return new Promise((res, rej) => {
		AsyncStorage.removeItem('TOKEN', (err) => {
			if (err) return rej(err);
			return res();
		});
	});
}

export default {
	signin,
	signup,
	signinSocial,
	signout,
};
