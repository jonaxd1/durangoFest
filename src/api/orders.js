import request from '../utils/request';

function placeOrder(order) {
	return request({
        url: '/orders/place',
        params: order,
		method: 'POST',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

function getOrders(idUser) {
	return request({
		url: '/orders/all',
		params: {idUser: idUser},
		method: 'GET',
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default {
	placeOrder,
	getOrders,
};
