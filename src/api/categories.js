import request from '../utils/request';

function getAll() {
	return request({
		url: '/categories',
		method: 'GET',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default {
	getAll,
};
