import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, 
    TouchableOpacity, Alert, AsyncStorage } from 'react-native'

import axios from 'axios'
//import AsyncStorage from '@react-native-community/async-storage'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'

const initialState = {         
    name: '',
    email: '',
    password: '',
    confirmPassword: '123456',
    stageNew: false 
}

export default class Auth extends Component {
    state = {
        ...initialState
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            this.props.navigation.navigate('Home', res.data)
        } catch (err) {
            //Alert.alert('Erro', 'Falha no Login!')
            showError(err)
        }
       //this.props.navigation.navigate('Home')

    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            Alert.alert('Sucesso!', 'Usuário cadastrado :)')
            this.setState({ stageNew: false })
        } catch (err) {
            showError(err)
        }
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    render(){
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((total, atual) => total && atual)

        return (
            <ImageBackground style={styles.background} source={backgroundImage}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>

                    {this.state.stageNew && 
                        <AuthInput icon='user' placeholder="Nome" value={this.state.name} 
                            style={styles.input} onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon='at' placeholder="E-mail" value={this.state.email} 
                        style={styles.input} onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' placeholder="Senha" value={this.state.password} secureTextEntry={true}
                        style={styles.input} onChangeText={password => this.setState({ password })} />

                    {this.state.stageNew && 
                        <AuthInput icon='asterisk' placeholder="Cinfirmação de Senha" secureTextEntry={true} 
                            value={this.state.confirmPassword} style={styles.input} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#aaa' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>    
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta ?' : 'Ainda não possui conta ?'}
                    </Text>    
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    title: {
        //fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    },
    
    subTitle:{
        //fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },

    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%', 
    },

    input: {
         marginTop: 10,
         backgroundColor: '#fff',
    },

    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },

    buttonText: {
        //fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
    },


})