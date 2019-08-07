import request from '../utils/request';

function byCategory(category) {
	return request({
        url: '/products',
        params: { category: category },
		method: 'GET',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default {
	byCategory,
};
