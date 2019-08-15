import React from 'react';
import {
	FlatList,
	Text,
	ImageBackground,
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import Header from '../../components/Header';

import api from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
		bottom: 15,
	},
	textNotification: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	}
});

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			products: [],
			order: [],
			totalItems: 0,
			totalPrice: 0,
		};
		this.loadCategories = this.loadCategories.bind(this)
		this.loadProducts = this.loadProducts.bind(this)
		this.addToOrder = this.addToOrder.bind(this)
		this.gotoMyOrder = this.gotoMyOrder.bind(this)
		this.clearState = this.clearState.bind(this)
	}


	componentDidMount() {
		const { navigation } = this.props;
		this.clearState();
		this.loadCategories();
		this.loadProducts('Pizzas');
		this._navListener = navigation.addListener('willFocus', this.clearState)
	}

	componentWillUnmount() {
		this._navListener.remove();
	}

	clearState() {
		const { navigation } = this.props;
		const clear = navigation.getParam('clear', false);
		if (clear) {
			this.setState({
				order: [],
				totalItems: 0,
				totalPrice: 0,
			},() => {
				this.loadProducts('Pizzas');
			})
		}
	}

	gotoMyOrder() {
		const { navigation } = this.props;
		const { order, totalPrice } = this.state;
		navigation.navigate('Orden', {order: order, total: totalPrice });
	}

	addToOrder(item) {
		const { order, totalItems, totalPrice } = this.state;
		let total = totalPrice;
		let items = totalItems;
		const newItem = {...item};
		newItem.quantity = 1;
		newItem.totalPrice = item.price;
		
		let handleOrder = [...order || []];

		if (item.isAdded) {
			const index = handleOrder.findIndex(function(element) {
				return element.idProduct === newItem.idProduct;
			});

			total -= handleOrder[index].totalPrice;
			items -= handleOrder[index].quantity;

			handleOrder.splice(index, 1);
			item.isAdded = false;

			this.setState({ order: handleOrder, totalItems: items, totalPrice: total });
		} else {
			if (totalItems < 5) {
				item.isAdded = true;
				const index = handleOrder.findIndex(function(element) {
					return element.idProduct === newItem.idProduct;
				});
				if (index >= 0) {
					handleOrder[index].quantity += 1;
					handleOrder[index].totalPrice = handleOrder[index].price * handleOrder[index].quantity;
				} else {
					handleOrder.push(newItem);
				}

				total += newItem.totalPrice;
				items += newItem.quantity;

				this.setState({ order: handleOrder, totalItems: items, totalPrice: total });
			} else {
				Toast.show('No puedes agregar más de 10 items', Toast.SHORT);
			}
		}
	}

	loadCategories() {
		api.categories.getAll()
			.then((data) => {
				this.setState({categories: data});
			})
			.catch((err) => {
				Toast.show('Oops! Ocurrio un error.\nIntenta de nuevo.', Toast.LONG);
			})
	}

	loadProducts(category) {
		api.products.byCategory(category)
			.then((data) => {
				this.setState({products: data});
			})
			.catch((err) => {
				Toast.show(err, Toast.LONG);
			});
	}

	_keyExtractor = (item, index) => item.name;

	_renderCategory = ({item}) => (
		<TouchableOpacity
			style={styles.cardContainer}
			onPress={() => this.loadProducts(item.name)}
		>
			<ImageBackground
				source={{uri: `http://localhost:3000/${item.img}`}}
				style={{ width: '100%', height: '100%' }}
				imageStyle={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}
				>
				<Text
					style={styles.cardTitle}
				>{item.name}</Text>
			</ImageBackground>
		</TouchableOpacity>
	);

	_renderProduct = ({item}) => {
		const iconType = (item.isAdded) ? "check" : "cart-plus"
		
		return (
		<View
			style={styles.rowContainer}
		>
			<Image
				source={{uri: `http://localhost:3000/${item.img}`}}
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
				>{`$${item.price}`}</Text>
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
		const { categories, products, totalItems, totalPrice } = this.state;
		return (
			<SafeAreaView
				style={styles.container}
			>
				<Header
					title="Menu"
				/>
				<View style={{marginTop: 2, flex: 1}}>
					<FlatList
						horizontal={true}
						data={categories}
						renderItem={this._renderCategory}
						keyExtractor={this._keyExtractor}
					/>
				</View>
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
			</SafeAreaView>
		);
	}
}

export default Menu;
