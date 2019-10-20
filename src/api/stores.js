import request from '../utils/request';

function getAllStores() {
	return request({
		url: '/stores',
		method: 'GET',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}
function getStore(idStore) {
	return request({
		url: '/stores/one',
		params: { where: { idStore: idStore } },
		method: 'GET',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default {
	// placeOrder,
	getStore,
	getAllStores,
};
