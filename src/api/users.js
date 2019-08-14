import request from '../utils/request';

function getInfo(idUser) {
	return request({
		url: '/users/info',
		params: { idUser },
	}).then((response) => {
		const { data, errmsg, errcode } = response.data;
		if (errmsg) throw Object({ message: errmsg, code: errcode });
		return data;
	});
}

export default { getInfo };
