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
import LinearGradient from 'react-native-linear-gradient';

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
	accountContainer: {
		alignItems: 'center',
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

class Account extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			totalPoints: 0,
			historyPoints: [],
			loading: false,
		};
		this.loadUser = this.loadUser.bind(this)
	}

	componentDidMount() {
		this.loadUser();
	}

	async loadUser() {
		let user = "";
		await AsyncStorage.getItem('TOKEN').then((token) => {
			user = token;
		})
		api.users.getInfo(user)
			.then((res) => {
				this.setState({user: res});
				return res
			})
			.then((user) => {
				api.rewards.getPoints(user.idCustomer)
					.then((data) => {
						this.setState({ totalPoints: data.validPoints, historyPoints: data.rewardsList })
					})
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
				backgroundColor: '#C3C3C3',
			}}
		/>
	);

	_renderPoints = ({item}) => {
		return (
			<View style={{ 
				flexDirection: 'row', 
				alignItems: 'center',
				paddingVertical: 20,
				justifyContent: 'space-between',
			}}>
				<View>
					<Text style={{fontSize: 18, fontWeight: '500'}}>{item.store}</Text>
					<Text style={{fontSize: 14}}>{new Date(item.createdAt).toLocaleString()}</Text>
				</View>
				<Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.total}</Text>
			</View>
		)
	}
	
	render() {
		const { user, totalPoints, historyPoints, loading } = this.state
		return (
			<SafeAreaView
				style={styles.container}
			>
				<Header
					btnName="ios-log-out"
					action={this.logout}
					title="Cuenta"
				/>
				<View style={styles.accountContainer}>
					<View>
						<Icon name="account-circle" size={125} color="#BEBEBE" />
					</View>
					<Text style={styles.name}>{user.first_name} {user.last_name}</Text>
					<Text>@{user.username}</Text>
				</View>
				<LinearGradient 
					colors={['#FFFFFF','#a31a78','#207ce5']}
					style={{ 
						marginTop: 25,
						backgroundColor: '#000066',
						alignItems: 'center',
						padding: 20,
						flex: 1,
				}}>
					<Text
						style={{ fontSize: 16, fontWeight: '300' }}
					>Puntos Disponibles:</Text>
					<Text style={{ fontSize: 28, fontWeight: 'bold' }}>{totalPoints.toString()}</Text>
					<Text style={{ color: '#606060' }}>hasta: 01/12/2019</Text>
					<View style={{ width:'100%', height:1, backgroundColor: '#DCDCDC', marginTop: 15}}/>
					<FlatList
						style={{ width: '100%'}}
						data={historyPoints.reverse()}
						keyExtractor={this._keyExtractor}
						ItemSeparatorComponent={this._itemSeparator}
						renderItem={this._renderPoints}
						onRefresh={() => this.loadUser()}
						refreshing={loading}
					/>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default Account;
