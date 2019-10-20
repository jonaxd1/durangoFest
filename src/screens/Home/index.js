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

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stores: [],
		};
		this.gotoStore = this.gotoStore.bind(this);
	}


	componentDidMount() {
		this.getStores();
	}

	componentWillUnmount() {
	}

	getStores() {
		api.stores.getAllStores()
			.then((stores) => {
				this.setState({ stores })
			})
			.catch((err) => {
				Toast.show(err.message);
			})
	}

	gotoStore(idStore) {
		const { navigation } = this.props;
		navigation.navigate('Store', {idStore});
	}

	_keyExtractor = (item, index) => item.name;

	_renderStores = ({item}) => {
		return (
		<TouchableOpacity
			style={styles.rowContainer}
			onPress={() => this.gotoStore(item.idStore)}
		>
			<Image
				source={{uri: item.img_url ? `http://localhost:3000/${item.img_url}` : `http://localhost:3000/static/img/misc/img_nf.png`}}
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
			</View>
			
				<Icon
					name="chevron-right"
					color= "#F5A623"
					size={24}
					style={styles.rowIconButton}
				/>
		</TouchableOpacity>
	)};
	
	render() {
		const { stores } = this.state;
		return (
			<SafeAreaView
				style={styles.container}
			>
				<Header
					title="Home"
				/>
				<View style={{flex: 1}}>
					<FlatList
						data={stores}
						renderItem={this._renderStores}
						ListEmptyComponent={() => (
							<View>
								<Text>Aún no hay tiendas registradas :(</Text>
							</View>
						)}
						keyExtractor={this._keyExtractor}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

export default Home;
