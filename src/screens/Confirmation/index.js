/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header';

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
	ticketContainer: {
		margin: 20,
		padding: 10,
		borderRadius: 17,
		borderWidth: 1,
		borderColor: '#c3c3c3',
		marginHorizontal: 23,
		alignItems: 'center',
	},
	ticketTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	ticketText: {
		fontSize: 15,
	},
	button: {
		backgroundColor: '#F5A623',
		paddingVertical: 20,
		marginHorizontal: 50,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 15,
	}
});

class Confirmation extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
		super(props);
		this.state={
			order: {
				idOrder: 100,
				saleAmount: 110,
			},
		}
    }

	componentDidMount() {
		const { navigation } = this.props
		debugger;
		const order = navigation.getParam('order', [])
		this.setState({order})
	}

    render() {
		const { navigation } = this.props;
		const { order } = this.state;
        return (
            <SafeAreaView
				style={styles.container}
			>
				<Header
					title="Confirmación de Orden"
				/>
				<View
					style={styles.ticketContainer}
				>
					<Text
						style={styles.ticketTitle}
					>¡Recibimos tu orden!</Text>
					<Image
						source={require('../../assets/images/cutting-food.png')}
						style={{width: 120, height: 109}}
					/>
					<Text>No. de Orden: {order.idOrder}</Text>
					<Text>Total a Pagar: ${order.saleAmount}</Text>
				</View>
                <TouchableOpacity
					style={styles.button}
                    onPress={() => {
						navigation.navigate('Menu', {clear: true});
					}}
				>
					<Text style={styles.buttonText}>Genial</Text>
				</TouchableOpacity>
			</SafeAreaView>
        );
    }
}

export default Confirmation;
