import { createStackNavigator } from 'react-navigation';
import SignIn from '../screens/Signin';

const navigator = createStackNavigator({
	Signin: SignIn,
});

export default navigator;
