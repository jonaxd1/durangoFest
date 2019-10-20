/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React from 'react';
import {
	View,
	Text,
	TextInput,
	ImageBackground,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import api from '../../api';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	formContainer: {
        marginTop: 50,
        padding: 10,
		// position: 'absolute',
		// left: 0,
		// right: 0,
		// bottom: 0,
		// height: 350,
		// padding: 20,
	},
	logoContainer: {
		// alignItems: 'center',
		// justifyContent: 'center',
		// flex: 1,
	},
	title: {
		fontSize: 32,
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.8)',
		color: '#000',
		paddingHorizontal: 10,
		marginBottom: 10,
		borderRadius: 30,
	},
	buttonContainer: {
		backgroundColor: '#f7c744',
		paddingVertical: 15,
		borderRadius: 30,
	},
	buttonText: {
		textAlign: 'center',
		color: '#1E1E1E',
		fontWeight: 'bold',
		fontSize: 18,
	},
});

class SignUp extends React.Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
            first_name: '',
            last_name: '',
            username: '',
			email: '',
            password: '',
        };
        this.gotoSignin = this.gotoSignin.bind(this);
	}

	signup = () => {
		const { first_name, last_name, username, email, password } = this.state;
		api.auth.signup({ first_name, last_name, username, email, password })
			.then(() => {
				const { navigation } = this.props;
				navigation.navigate('App');
			});
    }
    
    onChangeText = name => (value) => {
		this.setState({ [name]: value });
    }
    
    gotoSignin = () => {
        const {navigation} = this.props;
        navigation.navigate('Signin');
    }

	render() {
		return (
			<ImageBackground
				source={require('../../assets/images/signup.jpg')}
				style={{ width: '100%', height: '100%' }}
			>
				<SafeAreaView
					style={styles.container}
				>
					<KeyboardAvoidingView
						behavior="padding"
					>
						<TouchableWithoutFeedback
							onPress={Keyboard.dismiss}
						>
							<View style={styles.formContainer}>
								<View>
									<Text style={styles.title}>ÚNETE A</Text>
									<Text style={styles.title}>Durango FEST 2019</Text>
								</View>
								<View
								>
									<TextInput
										style={styles.input}
										placeholder="Nombre"
										onChangeText={this.onChangeText('first_name')}
										keyboardType="default"
										autoCapitalize="words"
										autoCompleteType="name"
										returnKeyType="next"
										placeholderTextColor="#1C1C1C"
									/>
									<TextInput
										style={styles.input}
										placeholder="Apellido"
										onChangeText={this.onChangeText('last_name')}
										keyboardType="default"
										autoCapitalize="words"
										autoCompleteType="name"
										returnKeyType="next"
										placeholderTextColor="#1C1C1C"
									/>
									<TextInput
										style={styles.input}
										placeholder="Nombre de Usuario"
										onChangeText={this.onChangeText('username')}
										keyboardType="default"
										autoCapitalize="none"
										autoCompleteType="username"
										returnKeyType="next"
										placeholderTextColor="#1C1C1C"
									/>
									<TextInput
										style={styles.input}
										placeholder="Email"
										onChangeText={this.onChangeText('email')}
										keyboardType="email-address"
										autoCapitalize="none"
										autoCompleteType="email"
										returnKeyType="next"
										placeholderTextColor="#1C1C1C"
									/>
									<TextInput
										style={styles.input}
										placeholder="Contraseña"
										onChangeText={this.onChangeText('password')}
										secureTextEntry
										returnKeyType="done"
										autoCompleteType="password"
										placeholderTextColor="#1C1C1C"
										autoCorrect={false}
									/>
									<TouchableOpacity
										style={styles.buttonContainer}
										onPress={this.signup}
									>
										<Text style={styles.buttonText}>Registrarse</Text>
									</TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 10,
                                            alignItems: 'center'
                                        }}
                                        onPress={this.gotoSignin}
                                        >
                                        <Text
                                            style={{ color: '#ffffff', textDecorationLine: 'underline' }}
                                        >¿Ya tienes cuenta?</Text>
                                    </TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</ImageBackground>
		);
	}
}

export default SignUp;
