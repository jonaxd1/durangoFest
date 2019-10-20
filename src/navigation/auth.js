import { createStackNavigator } from 'react-navigation';
import SignIn from '../screens/Signin';
import SignUp from '../screens/Signup';

const navigator = createStackNavigator({
	Signin: SignIn,
	Signup: SignUp,
});

export default navigator;
