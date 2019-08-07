import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Menu from '../screens/Menu';
import Ionicicon from 'react-native-vector-icons/Ionicons'

const tab1 = createStackNavigator(
	{
		menu: Menu,
	}
);

const navigator = createBottomTabNavigator(
	{
		Menu: {
			screen: Menu,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
				  <Ionicicon name="ios-today" size={28} color={tintColor} />
				)
			  },
		},
	}
)

export default navigator;
