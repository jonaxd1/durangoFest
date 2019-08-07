import React from 'react';
import {
	ActivityIndicator,
	StatusBar,
	View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoading extends React.Component {

	async componentDidMount() {
		const { navigation } = this.props;
		let token;
		try {
			token = await AsyncStorage.getItem('TOKEN');
		} catch (err) {
			token = null;
		}
		if (token) navigation.navigate('Menu');
		else navigation.navigate('Signin');
	}

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

export default AuthLoading;
