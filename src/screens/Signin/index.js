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
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import {
	LoginManager,
	AccessToken,
	GraphRequest,
	GraphRequestManager,
} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../api';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	// formContainer: {
	// 	position: 'absolute',
	// 	left: 0,
	// 	right: 0,
	// 	bottom: 0,
	// 	height: 210,
	// 	padding: 20,
	// },
	logoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
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
		width: 250,
		backgroundColor: '#f7c744',
		paddingVertical: 15,
		borderRadius: 30,
		marginBottom: 10,
	},
	buttonFBContainer: {
		width: 50,
		alignItems: 'center',
		backgroundColor: '#3B5998',
		paddingVertical: 10,
		borderRadius: 30,
	},
	buttonText: {
		textAlign: 'center',
		color: '#1E1E1E',
		fontWeight: 'bold',
		fontSize: 18,
	},
});

class SignIn extends React.Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.gotoSignup = this.gotoSignup.bind(this);
		this.signin = this.signin.bind(this);
		this.facebookSignin = this.facebookSignin.bind(this);
	}

	signin = () => {
		const { email, password } = this.state;
		api.auth.signin({ email, password })
			.then(() => {
				const { navigation } = this.props;
				navigation.navigate('App');
			})
			.catch((err) => {
				Toast.show(err.message, Toast.SHORT);
			});
	}

	facebookSignin = () => {
		const { navigation } = this.props;
		LoginManager.logInWithPermissions(["public_profile","email"]).then(
			function (result) {
				if (result.isCancelled) {
					console.log("Login cancelled");
				} else {
					AccessToken
					.getCurrentAccessToken()
					.then((data) => {
						const { accessToken } = data;
						const responseInfoCallback = (error, res) => {
							if (error) {
								Alert.alert('Error');
							} else {
								res.facebook_token = accessToken;
								api.auth.signinSocial(res)
									.then(() => {
										navigation.navigate('App');
									})
									.catch((err) => {
										Toast.show(err.message, Toast.LONG);
									});
							}
						};
						const infoRequest = new GraphRequest('/me', {
							accessToken,
							parameters: {
								fields: {
									string: 'first_name,last_name,email',
								},
							},
						}, responseInfoCallback);

						// Start the graph request.
						new GraphRequestManager()
							.addRequest(infoRequest)
							.start();
					});
				}
			},
			function (error) {
				console.log("Login fail with error: " + error);
			}
		);
	}

	gotoSignup = () => {
		const { navigation } = this.props;
		navigation.navigate('Signup');
	}

	render() {
		return (
			<ImageBackground
				source={require('../../assets/images/bg.jpg')}
				style={{ width: '100%', height: '100%' }}
			>
				<SafeAreaView
					style={styles.container}
				>
					<KeyboardAvoidingView
						behavior="padding"
						style={{}}
					>
						<TouchableWithoutFeedback
							style={{}}
							onPress={Keyboard.dismiss}
						>
							<>
								<View style={{}}>
									<Text style={styles.title}>Durango FEST 2019</Text>
								</View>
								<View
									style={{marginHorizontal: 15}}
								>
									<TextInput
										style={styles.input}
										placeholder="Email"
										onChangeText={email => this.setState({ email })}
										keyboardType="email-address"
										autoCapitalize="none"
										autoCompleteType="email"
										returnKeyType="next"
										placeholderTextColor="#1C1C1C"
									/>
									<TextInput
										style={styles.input}
										placeholder="Password"
										onChangeText={password => this.setState({ password })}
										secureTextEntry
										returnKeyType="done"
										placeholderTextColor="#1C1C1C"
										autoCorrect={false}
									/>
								</View>
								<View
									style={{alignItems:'center', justifyContent: 'center'}}
								>
									<TouchableOpacity
										style={styles.buttonContainer}
										onPress={this.signin}
									>
										<Text style={styles.buttonText}>Iniciar Sesión</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.buttonFBContainer}
										onPress={this.facebookSignin}
									>
										<Icon name="facebook" color="#FFFFFF" size={25}/>
									</TouchableOpacity>
									<TouchableOpacity
										style={{ alignItems: 'center', marginTop: 10 }}
										onPress={this.gotoSignup}
									>
										<Text
											style={{ color: '#ffffff', textDecorationLine: 'underline' }}
										>REGISTRATE</Text>
									</TouchableOpacity>
								</View>
							</>
						</TouchableWithoutFeedback>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</ImageBackground>
		);
	}
}

export default SignIn;
