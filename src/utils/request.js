import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Service } from 'axios-middleware';

const request = axios.create({
	baseURL: 'http://api.food.vabadus.mx/api',
});

const service = new Service(request);


service.register({
	async onRequest({ includeAuth, ...props }) {
		const token = await AsyncStorage.getItem('TOKEN');
		const newProps = { ...props };
		newProps.headers['accept-language'] = 'es';
		newProps.headers['authorization'] = token;
		delete newProps.includeAuth;
		console.log(props);
		return props;
	},
});
export default request;
