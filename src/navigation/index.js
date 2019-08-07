import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppStack from './app';
import AuthStack from './auth';
import AuthLoading from '../screens/AuthLoading';

const switchNavigator = createSwitchNavigator(
	{
		AuthLoading,
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	},
);

const navigator = createAppContainer(switchNavigator);

export default navigator;
