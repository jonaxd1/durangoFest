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

export default {
	placeOrder,
};
