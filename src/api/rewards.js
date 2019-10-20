import request from '../utils/request';

function getPoints(idCustomer) {
	return request({
		url: '/rewards/valid',
		params: { idCustomer },
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default { getPoints };
