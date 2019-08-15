import React from 'react';
import {
	FlatList,
	Text,
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	title: {
		fontSize: 34,
		fontWeight: 'bold',
		paddingLeft: 22,
		marginBottom: 10,
	},
	rowContainer: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowDataContainer: {
		paddingLeft: 5,
	},
	rowImg: {
		width: 80,
		height: 80,
		borderRadius: 10,
	},
	rowTitle: {
		fontSize: 22,
		color: '#000',
	},
	rowDescription: {
		width: 214,
		fontSize: 12,
		color: '#5D5D5D',
	},
	rowPrice: {
		fontSize: 17,
		color: '#000',
		fontWeight: 'bold',
	},
	rowButtonContainer: {
		width: 56,
		height: 35,
		borderColor: '#F5A623',
		borderWidth: 2,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rowButtonAddedContainer: {
		width: 50,
		height: 35,
		borderColor: '#F5A623',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5A623',
	},
	rowIconButton: {
		paddingTop: 5,
	},
	dataPreviewContainer: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textEstimatedTimeTitle: {
		color: '#525252',
		fontSize: 13,
	},
	textEstimatedTime: {
		color: '#525252',
		fontSize: 33,
		fontWeight: 'bold',
	},
	textTotalTitle: {
		color: '#525252',
		fontSize: 16,
		fontWeight: 'bold',
	},
	textTotal: {
		color: '#BA312F',
		fontSize: 43,
		fontWeight: 'bold',
	},
	buttonContainer: {
		backgroundColor: '#F5A623',
		padding: 15,
		margin: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
	textButton: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

class MyOrder extends React.Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			order: [],
			totalItems: 0,
			totalPrice: 0,
			totalEstimatedTime: 0,
		};
		this.addQuantity = this.addQuantity.bind(this);
		this.removeQuantity = this.removeQuantity.bind(this);
		this.loadOrder = this.loadOrder.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
		this.calculateTime = this.calculateTime.bind(this);
		this.placeOrder = this.placeOrder.bind(this);
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		this.loadOrder;
		this._navListener = navigation.addListener('willFocus', this.loadOrder)
	}

	componentWillUnmount() {
		this._navListener.remove();
	}

	loadOrder() {
		const { navigation } = this.props;

		const order = navigation.getParam('order', []);
		const total = navigation.getParam('total', 0);
		navigation.setParams({order: [], total: 0});
		this.setState({ order: order, totalPrice: total }, () => {
			this.calculateTime();
			this.totalItems();
		});
	}

	addQuantity(idProduct) {
		const { order, totalItems} = this.state;

		if (totalItems < 5) {
			let handleOrder = [...order || []];
		
			const index = handleOrder.findIndex(function(element) {
				return element.idProduct === idProduct;
			});
			if (index >= 0) {
				if (handleOrder[index].quantity < 5) {
					handleOrder[index].quantity += 1;
					handleOrder[index].totalPrice = handleOrder[index].price * handleOrder[index].quantity;
					this.setState({order: handleOrder});
					this.calculateTotal();
					this.calculateTime(true);
					this.totalItems();
				} else {
					Toast.show('No puedes agregar más de 5 items del mismo producto.', Toast.SHORT);
				}
			}
		} else {
			Toast.show('No puedes agregar más de 5 items.', Toast.SHORT);
		}
	}
	
	removeQuantity(idProduct) {
		const { order, totalItems} = this.state;

		if (totalItems > 1) {
			let handleOrder = [...order || []];
		
			const index = handleOrder.findIndex(function(element) {
				return element.idProduct === idProduct;
			});
			if (index >= 0) {
				if (handleOrder[index].quantity > 1) {
					handleOrder[index].quantity -= 1;
					handleOrder[index].totalPrice = handleOrder[index].price * handleOrder[index].quantity;
					this.setState({order: handleOrder},() => {
						this.calculateTotal();
						this.calculateTime();
						this.totalItems();
					});
					
				} else {
					handleOrder.splice(index, 1);
					this.setState({order: handleOrder},() => {
						this.calculateTotal();
						this.calculateTime();
						this.totalItems();
					});
				}
			}
		} else {
			this.setState({
				order: [],
				totalItems: 0,
				totalPrice: 0,
				totalEstimatedTime: 0,
			},() => {
				this.props.navigation.navigate('Menu');
			});
		}
	}
	
	calculateTotal() {
		const { order } = this.state;
		let total = 0;
		let handleOrder = [...order || []];

		handleOrder.forEach(function(order){
			total += order.totalPrice;
		});
		this.setState({totalPrice: total});
	}

	calculateTime(isModify) {
		const { totalEstimatedTime } = this.state;
		let total = 0;
		if (isModify) {
			total = totalEstimatedTime;
		}
		const { order } = this.state;
		let handleOrder = [...order || []];

		handleOrder.forEach(function(order){
			total += order.estimatedTime;
		});
		this.setState({totalEstimatedTime: total});
	}

	totalItems() {
		const { order } = this.state;
		let total = 0;

		let handleOrder = [...order || []];
		handleOrder.forEach(function(order){
			total += order.quantity;
		});
		this.setState({ totalItems: total });
	}

	_keyExtractor = (item, index) => item.name;

	_renderProduct = ({item}) => {
		return (
		<View
			style={styles.rowContainer}
		>
			<Image
				source={{uri: 'http://localhost:3000/'+item.img}}
				style={styles.rowImg}
			/>
			<View
				style={styles.rowDataContainer}
			>
				<Text
					style={styles.rowTitle}
				>{item.name}</Text>
				<Text
					style={styles.rowDescription}
				>{item.description}</Text>
				<Text
					style={styles.rowPrice}
				>${item.price}</Text>
			</View>
			<View
				style={{
					borderColor: '#F5A623',
					borderWidth: 2,
					borderRadius: 10,
				}}
			>
				<TouchableOpacity
					style={[styles.rowButtonAddedContainer,{
						borderBottomRightRadius: 0,
						borderBottomLeftRadius: 0,
					}]}
					onPress={() => this.addQuantity(item.idProduct)}
				>
					<Ionicon
						name={"ios-add"}
						color={"#FFF"}
						size={24}
						style={styles.rowIconButton}
					/>
				</TouchableOpacity>
				<Text
					style={{
						padding: 10,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>{item.quantity}</Text>
				<TouchableOpacity
					style={[styles.rowButtonAddedContainer,{
						borderTopRightRadius: 0,
						borderTopLeftRadius: 0,
					}]}
					onPress={() => this.removeQuantity(item.idProduct)}
				>
					<Ionicon
						name={"ios-remove"}
						color={"#FFF"}
						size={24}
						style={styles.rowIconButton}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)};
	
	confirmSave = () => {
		Alert.alert(
			'Confirmar',
			'¿Estás seguro de realizar el pedido?',
			[
				{ text: 'Cancelar', onPress: () => null, style: 'cancel' },
				{ text: 'OK', onPress: this.placeOrder },
			])
	}

	async placeOrder() {
		debugger;
		const { order, totalPrice } = this.state;
		let handleOrder = [...order || []];
		let orderToPlace = [];
		let orderObj = {};
		let user = "";
		await AsyncStorage.getItem('TOKEN').then((token) => {
			user = token;
		})
		handleOrder.forEach(function(myOrder){
			orderToPlace.push({
				quantity: myOrder.quantity,
				price: myOrder.totalPrice,
				pricePerUnit: myOrder.price,
				idProduct: myOrder.idProduct,
			});
		});
		orderObj = {
			order: orderToPlace,
			idUser: user,
			saleAmount: totalPrice,
		}
		api.orders.placeOrder(orderObj)
			.then((res) => {
				const { navigation } = this.props;
		
				this.setState({
					order: [],
					totalItems: 0,
					totalPrice: 0,
					totalEstimatedTime: 0,
				});
				navigation.navigate('Confirmation', {order: res});
			});
	};

	render() {
		const { order, totalPrice, totalEstimatedTime } = this.state;
		
		return (
			<SafeAreaView
				style={styles.container}
			>
				<Header
					title="Mi Orden"
				/>
				{
					order.length > 0
					? (
						<>
							<FlatList
								data={order}
								renderItem={this._renderProduct}
								ListHeaderComponent={this._headerComponent}
								ListFooterComponent={() => (
									<View
										style={{
										paddingVertical: 33,
										}}
									></View>
								)}
								keyExtractor={this._keyExtractor}
							/>
							<View
								style={styles.dataPreviewContainer}
							>
								<View>
									<Text
										style={styles.textEstimatedTimeTitle}
									>Tiempo Estimado de Entrega</Text>
									<Text
										style={styles.textEstimatedTime}
									>{`${totalEstimatedTime} mins`}</Text>
								</View>
								<View>
									<Text
										style={styles.textTotalTitle}
									>Total:</Text>
									<Text
										style={styles.textTotal}
									>{`$${totalPrice}`}</Text>
								</View>
							</View>
							<TouchableOpacity
								style={styles.buttonContainer}
								onPress={this.confirmSave}
							>
								<Text
									style={styles.textButton}
								>Realizar Pedido</Text>
							</TouchableOpacity>
					</>
				)
				:
				<View
					style={[
						styles.container,
						{
							justifyContent: 'center',
							alignItems: 'center',
						}
					]}
				>
					<Ionicon
						name="ios-restaurant"
						size={120}
						color="#9F9D9C"
					/>
					<Text
						style={{
							fontSize: 16,
							color: '#9F9D9C'
						}}
					>Encuentra pizzas, bebidas, postres y más</Text>
					<Text
						style={{
							fontSize: 23,
							color: '#9F9D9C'
						}}
					>Disfruta</Text>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => {this.props.navigation.navigate('Menu')}}
					>
						<Text
							style={styles.textButton}
						>Empezar</Text>
					</TouchableOpacity>
				</View>
				}
			</SafeAreaView>
		);
	}
}

export default MyOrder;
