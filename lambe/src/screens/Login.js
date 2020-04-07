import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'


class Login extends Component {
    state = {
        name: 'Temporario',
        email: '',
        password: ''
    }

    login = () => {
        this.props.onLogin({ ...this.state })
        this.props.navigation.navigate('Profile')
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder=' Email' 
                    autoFocus={true} keyboardType='email-address'
                    value={this.state.email} 
                    onChange={email => this.setState({ email })} />

                <TextInput placeholder=' Senha' style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChange={password => this.setState({ password })} />

                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>    
                </TouchableOpacity>                    
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Register')
                }} style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar nova conta...</Text>    
                </TouchableOpacity>                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#eee',
        height: 30,
        borderWidth: 1,
        borderColor: '#333',
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
    },
    buttomText: {
        fontSize: 20,
        color: '#fff',
    },
})

const mapDispatcjToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatcjToProps)(Login)