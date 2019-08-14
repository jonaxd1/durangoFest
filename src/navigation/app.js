import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Ionicicon from 'react-native-vector-icons/Ionicons';

import Menu from '../screens/Menu';
import MyOrder from '../screens/MyOrder';
import Confirmation from '../screens/Confirmation';

const BottomNavigator = createBottomTabNavigator(
	{
		Menu: {
			screen: Menu,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
				  <Ionicicon name="ios-today" size={28} color={tintColor} />
				)
			},
		},
		Orden: {
			screen: MyOrder,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
				  <Ionicicon name="md-list-box" size={28} color={tintColor} />
				)
			},
		},
	}
);

const navigator = createStackNavigator(
	{
		BottomNavigator,
		Confirmation: Confirmation,
	},{
		headerMode: "none"
	}
);

export default navigator;
