import request from '../utils/request';

function getProducts(idStore, filter) {
	return request({
        url: '/products/by',
        params: { idStore, filter },
		method: 'GET',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default {
	getProducts,
};
