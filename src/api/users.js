import request from '../utils/request';

function getInfo(idCustomer) {
	return request({
		url: '/customers/info',
		params: { idCustomer },
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default { getInfo };
