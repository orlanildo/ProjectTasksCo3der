import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, 
    TouchableOpacity, Alert } from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

export default class Auth extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        statgeNew: false
    }

    signinOrSignup = () => {
        if(this.state.statgeNew){
            Alert.alert('Sucesso!', 'Criar conta')
        }else{
            Alert.alert('Sucesso!', 'Logar')
        }
    }

    render(){
        return (
            <ImageBackground style={styles.background} source={backgroundImage}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.statgeNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>

                    {this.state.statgeNew && 
                        <AuthInput icon='user' placeholder="Nome" value={this.state.name} 
                            style={styles.input} onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon='at' placeholder="E-mail" value={this.state.email} 
                        style={styles.input} onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' placeholder="Senha" value={this.state.password} secureTextEntry={true}
                        style={styles.input} onChangeText={password => this.setState({ password })} />

                    {this.state.statgeNew && 
                        <AuthInput icon='asterisk' placeholder="Cinfirmação de Senha" value={this.state.confirmPassword} 
                            style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.statgeNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>    
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({ statgeNew: !this.state.statgeNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.statgeNew ? 'Já possui conta ?' : 'Ainda não possui conta ?'}
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