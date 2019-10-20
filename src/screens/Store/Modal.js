import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
	button: {
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 19,
        color: '#FFF'
    }
});

const ModalView = (props) => {
    const {
		isModalVisible, toggleModal, filterFunc,
	} = props;
	return (
        <Modal isVisible={isModalVisible}>
            <View style={{ backgroundColor: "#FFF", margin: 25, borderRadius: 10, padding: 10, }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={{fontSize: 23, fontWeight: '700'}}>Mostrar Productos</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Icon name="close" size={24}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => filterFunc(null)}
                        style={[styles.button, {backgroundColor: '#c95ba7'}]}
                    >
                        <Text style={styles.buttonText}>Precio Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => filterFunc(1)}
                        style={[styles.button, {backgroundColor: '#207ce5'}]}
                    >
                        <Text style={styles.buttonText}>Pagando con Puntos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalView;