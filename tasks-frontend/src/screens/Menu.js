import React from 'react'
import { View, Text, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar} 
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
                    <Text style={styles.email}>{props.navigation.getParam('email')}</Text>

                    <TouchableOpacity onPress={logout}>
                        <View style={styles.logoutIcon}>
                            <Icon name='sign-out' size={30} color="#800" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },

    title: {
        //fontFamily: commonStyles.fontFamily,
        color: '#000',
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
    },  
    
    avatar: {
        marginTop: 0,
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 20,
        backgroundColor: '#222',
    },

    userInfo: {
        marginLeft: 10,

    },

    name: {
        //fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 5,
        color: commonStyles.colors.mainText,
    },

    email: {
        //fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 10,

    },

    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10,
    }
})