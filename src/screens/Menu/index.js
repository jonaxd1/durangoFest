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

import api from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
	rowTextButton: {
		color: '#F5A623',
		fontSize: 15,
	},
});

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			products: [],
		};
	}

	componentDidMount() {
			api.categories.getAll()
				.then((data) => {
					this.setState({categories: data});
				})
				.catch((err) => {
					Toast.show('Oops! Ocurrio un error.\nIntenta de nuevo.', Toast.LONG);
				})
			api.products.byCategory('pizzas')
				.then((data) => {
					this.setState({products: data});
				})
				.catch((err) => {
					Toast.show(err, Toast.LONG);
				});
	}

	_renderCategory = ({item}) => (
		<View
			style={styles.cardContainer}
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
		</View>
	);

	_renderProduct = ({item}) => (
		<View
			style={styles.rowContainer}
		>
			<Image
				source={{uri: `http://localhost:3000/${item.img}`}}
				style={{ width: 80, height: 80 }}
			/>
			<View>
				<Text
					style={styles.rowTitle}
				>{item.name}</Text>
				<Text
					style={styles.rowDescription}
				>{item.description}</Text>
				<Text>{`$${item.price}`}</Text>
			</View>
			<TouchableOpacity
				style={styles.rowButtonContainer}
			>
				<Icon name="cart-plus" color="#F5A623" size={28}/>
			</TouchableOpacity>
		</View>
	);
	
	render() {
		const { categories, products } = this.state;
		return (
			<SafeAreaView>
				<FlatList
					horizontal={true}
					data={categories}
					renderItem={this._renderCategory}
				/>
				<FlatList
					data={products}
					renderItem={this._renderProduct}
				/>
			</SafeAreaView>
		);
	}
}

export default Menu;
