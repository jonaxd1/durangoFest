import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Ionicicon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Store from '../screens/Store';
import MyOrder from '../screens/MyOrder';
import Confirmation from '../screens/Confirmation';
import History from '../screens/History';
import Account from '../screens/Account';

const BottomNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
				  <Ionicicon name="ios-today" size={28} color={tintColor} />
				)
			},
		},
		Historial: {
			screen: History,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
				  <Ionicicon name="ios-list" size={28} color={tintColor} />
				)
			},
		},
		Cuenta: {
			screen: Account,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
				  <Ionicicon name="ios-contact" size={28} color={tintColor} />
				)
			},
		}
	}, {
		tabBarOptions: {
			style: {
				backgroundColor: '#EFEFEF',
			}
		}
	}
);

const navigator = createStackNavigator(
	{
		BottomNavigator,
		Store,
		MyOrder,
		Confirmation: Confirmation,
	},{
		headerMode: "none"
	}
);

export default navigator;
