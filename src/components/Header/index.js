import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 22,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.1)',
	},
	title: {
		fontSize: 34,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

const Header = (props) => {
	const {
		title, action, onAction, btnName
	} = props;
	return (
		<View
			style={styles.container}
		>
			<Text
				style={styles.title}
			>
				{title}
			</Text>
			{action && (
				<TouchableOpacity
					onPress={action}
				>
					<Ionicon name={btnName} size={28} color="#0B6AFF"/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Header;
