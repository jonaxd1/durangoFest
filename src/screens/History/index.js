import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	title: {
		fontSize: 34,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

class History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			orders: [],
		};
		this.loadOrders = this.loadOrders.bind(this)
	}

	componentDidMount() {
		this.loadOrders();
	}

	async loadOrders() {
		let user = "";
		await AsyncStorage.getItem('TOKEN').then((token) => {
			user = token;
		})
		api.orders.getOrders(user)
			.then((res) => {
				this.setState({orders: res});
			})
			.catch((err) => {
				Toast.show(err, Toast.LONG);
			});
	}

	logout = () => {
		const { navigation } = this.props;
		api.auth.signout()
			.then(() => {
				navigation.navigate('Auth');
			})
			.catch((err) => {
				Toast.show(err.message);
			});
	}

	_keyExtractor = (item, index) => item.createdAt;

	_itemSeparator = () => (
		<View
			style={{
				paddingVertical: 1,
				marginLeft: 70,
				backgroundColor: '#C3C3C3',
			}}
		/>
	);

	_renderOrders = ({item}) => {
		const date = new Date(item.createdAt).toLocaleString();
		
		return (
			<View
				style={{
					flexDirection: 'row',
					paddingVertical: 20,
					paddingHorizontal: 23,
					justifyContent: 'space-between',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
					}}
				>
					<Icon name="history" size={40}/>
					<View
						style={{
							paddingLeft: 10,
						}}
					>
						<Text>Orden #: {item.idOrder}</Text>
						<Text>{date.toString()}</Text>
					</View>
				</View>
				<Text
					style={{
						fontSize: 19,
						fontWeight: 'bold',
						color: '#518E54'
					}}
				>${item.saleAmount}</Text>
			</View>
		)
	}

	render() {
		const { orders } = this.state
		return (
			<SafeAreaView
				style={styles.container}
			>
				{/* <View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: 22,
					}}
				>
					<Text
						style={styles.title}
					>
						Historial
					</Text>
					<TouchableOpacity
						onPress={() => {}}
					>
						<Ionicon name="ios-log-out" size={28} color="#0B6AFF"/>
					</TouchableOpacity>
				</View> */}
				<Header
					btnName="ios-log-out"
					action={this.logout}
					title="Historial"
				/>
				<FlatList
					data={orders}
					renderItem={this._renderOrders}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this._itemSeparator}
				/>
			</SafeAreaView>
		);
	}
}

export default History;
