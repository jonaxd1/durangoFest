import React from 'react';
import {
	FlatList,
	Text,
	ImageBackground,
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from '../../components/Header';
import ModalView from './Modal';
import api from '../../api';

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
	cardContainer: {
		width: 120,
		height: 150,
		marginLeft: 10,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomColor: 'rgba(0,0,0,0.2)',
		borderBottomWidth: 5,
	},
	cardTitle: {
		color: '#FFF',
		fontSize: 19,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 20,
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
		width: 56,
		height: 35,
		borderColor: '#F5A623',
		borderWidth: 2,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5A623',
	},
	rowIconButton: {
		paddingTop: 5,
	},
	rowTextButton: {
		color: '#F5A623',
		fontSize: 15,
	},
	notificationBar: {
		marginHorizontal: 20,
		padding: 15,
		backgroundColor: '#F5A623',
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 25,
	},
	textNotification: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	}
});

class Store extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			products: [],
			order: [],
			totalItems: 0,
			totalPrice: 0,
			store: {},
			isModalVisible: false,
			filter: null,
			loading: false,
		};
		this.gotoMyOrder = this.gotoMyOrder.bind(this);
		this.getStore = this.getStore.bind(this);
	}


	componentDidMount() {
		this.getStore();
	}

	componentWillUnmount() {
	}

	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	filterFunc = (value) => {
		const { filter, store } = this.state;
		if((value == 1 && filter != 1) || (value == null && filter != null)) {
			this.setState({
				filter: value,
				loading: true,
				// reset basket
				order: [],
				totalItems: 0,
				totalPrice: 0,
			}, 
				() => {
					this.getProducts(store);
					setTimeout(() => {
						this.setState({ loading: false})
					}, 1500);
				}
			);
		}
		this.toggleModal();
	}

	getStore() {
		const { navigation } = this.props;
		const idStore = navigation.getParam('idStore', 0);
		if (idStore > 0) {
			api.stores.getStore(idStore)
				.then((store) => {
					this.setState({ store })
					return store;
				})
				.then((store) => {
					this.getProducts(store);
				})
				.catch((err) => {
					Toast.show(err);
				})
		} else {
			Alert.alert('Error', 'No se pudo obtener la información\nPor favor intenta más tarde.', () => {
				navigation.goBack();
			});
		}
	}

	getProducts(store) {
		const { filter } = this.state;
		api.products.getProducts(store.idStore, filter)
			.then((products) => {
				this.setState({ products });
			})
			.catch((err) => {
				Toast.show(err);
			})
	}

	_keyExtractor = (item, index) => item.name;

	// _renderCategory = ({item}) => (
	// 	<TouchableOpacity
	// 		style={styles.cardContainer}
	// 		onPress={() => {}}
	// 	>
	// 		<ImageBackground
	// 			source={{uri: 'http://localhost:3000/${item.img}'}}
	// 			style={{ width: '100%', height: '100%' }}
	// 			imageStyle={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}
	// 			>
	// 			<Text
	// 				style={styles.cardTitle}
	// 			>{item.name}</Text>
	// 		</ImageBackground>
	// 	</TouchableOpacity>
	// );

	gotoMyOrder() {
		const { navigation } = this.props;
		const { order, totalPrice, store, filter } = this.state;
		navigation.navigate('MyOrder', {order: order, total: totalPrice, idStore: store.idStore, filter });
	}

	addToOrder(item) {
		const { order, totalItems, totalPrice, filter } = this.state;

		let total = totalPrice;
		let items = totalItems;
		const newItem = {...item};
		newItem.quantity = 1;
		!filter ? newItem.totalPrice = item.price : newItem.totalPrice = item.pricePoints;
		
		let handleOrder = [...order || []];

		if (item.isAdded) {
			const index = handleOrder.findIndex(function(element) {
				return element.idProduct === newItem.idProduct;
			});

			total -= Number(handleOrder[index].totalPrice);
			items -= handleOrder[index].quantity;

			handleOrder.splice(index, 1);
			item.isAdded = false;

			this.setState({ order: handleOrder, totalItems: items, totalPrice: total });
		} else {
			if (totalItems < 10) {
				item.isAdded = true;
				const index = handleOrder.findIndex(function(element) {
					return element.idProduct === newItem.idProduct;
				});
				if (index >= 0) {
					handleOrder[index].quantity += 1;
					!filter
						?  handleOrder[index].totalPrice = handleOrder[index].price * handleOrder[index].quantity
						: handleOrder[index].totalPrice = handleOrder[index].pricePoints * handleOrder[index].quantity
				} else {
					handleOrder.push(newItem);
				}

				total += Number(newItem.totalPrice);
				items += newItem.quantity;

				this.setState({ order: handleOrder, totalItems: items, totalPrice: total });
			} else {
				Toast.show('No puedes agregar más de 10 items', Toast.SHORT);
			}
		}
	}

	_renderProduct = ({item}) => {
		const iconType = (item.isAdded) ? "check" : "cart-plus"
		const { filter } = this.state;

		return (
		<View
			style={styles.rowContainer}
		>
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
					>{!filter ? `$${ item.price}` : `${item.pricePoints} puntos`}</Text>
			</View>
			<TouchableOpacity
				style={item.isAdded ? (styles.rowButtonAddedContainer) : styles.rowButtonContainer}
				onPress={() => this.addToOrder(item)}
			>
				<Icon
					name={iconType}
					color={item.isAdded ? "#FFF" : "#F5A623"}
					size={24}
					style={styles.rowIconButton}
				/>
			</TouchableOpacity>
		</View>
	)};
	
	render() {
		const { products, totalItems, totalPrice, loading } = this.state;
		if(loading) {
			return (
				<View style={{
					flex: 1, flexDirection: "column",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<ActivityIndicator size="large" />
				</View>
			)
		}
		return (
			<SafeAreaView
				style={styles.container}
			>
				<Header
					action={this.toggleModal}
					btnName="ios-funnel"
					title="Store"
				/>
				{/* <View style={{marginTop: 2, flex: 1}}>
					<FlatList
						horizontal={true}
						data={categories}
						renderItem={this._renderCategory}
						keyExtractor={this._keyExtractor}
					/>
				</View> */}
				<View style={{flex: 3}}>
					<FlatList
						data={products}
						renderItem={this._renderProduct}
						ListFooterComponent={() => (
							<View
								style={{
								paddingVertical: 33,
								}}
							></View>
						)}
						keyExtractor={this._keyExtractor}
					/>
				</View>
				{
					totalItems > 0
					? (
						<TouchableOpacity
							style={styles.notificationBar}
							onPress={this.gotoMyOrder}
						>
							<Text
								style={styles.textNotification}
							>{`${totalItems} items in cart`}</Text>
							<Text
								style={styles.textNotification}
							>{`$${totalPrice}`}</Text>
						</TouchableOpacity>
					) : null
				}
				<ModalView filterFunc={this.filterFunc} isModalVisible={this.state.isModalVisible} toggleModal={this.toggleModal} />
			</SafeAreaView>
		);
	}
}

export default Store;
