import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import iconImage from '../../assets/imgs/icon.png'


export default class Header extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={iconImage} style={styles.image} />
                    <Text style={styles.title}>Lambe Lambe</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        margin: Platform.OS === 'ios' ? 20 : 20,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#bbb',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    title: {
        color: '#000',
        //fontFamily: 'shelter',
        height: 30,
        fontSize: 28
    },

})
