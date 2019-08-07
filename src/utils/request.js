import axios from 'axios';
import { Service } from 'axios-middleware';

const request = axios.create({
	baseURL: 'http://localhost:3000/api',
});

const service = new Service(request);
service.register({
	async onRequest({ includeAuth, ...props }) {
		const newProps = { ...props };
		newProps.headers['accept-language'] = 'es';
		delete newProps.includeAuth;
		console.log(props);
		return props;
	},
});
export default request;
