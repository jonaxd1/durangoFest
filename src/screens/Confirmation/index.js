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
    Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

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
});

class Confirmation extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView
				style={styles.container}
			>
				<Text
					style={styles.title}
				>Confirmación de Orden</Text>
                <Button
                    title="OK!"
                    onPress={() => {
                    this.props.navigation.navigate('Menu', {clear: true});
                }} />
			</SafeAreaView>
        );
    }
}

export default Confirmation;
