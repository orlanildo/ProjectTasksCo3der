import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image,
    Dimensions, Platform, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'

import { addPost } from '../store/actions/posts'
import * as ImagePicker from 'expo-image-picker'

class AddPhoto extends Component {
    state = {
        image: null,
        comment: '',
    }

    pickImage = async () => {
        if(await ImagePicker.requestCameraRollPermissionsAsync() === false){
            alert("Permission to access camera roll is required!")
            return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync()

        if (pickerResult.cancelled === true) return
      
        this.setState({ image: { uri: pickerResult.uri, base64: pickerResult.uri } })
    }

    save = async () => {
        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        })

        this.setState({ image: null, comment: '' })
        this.props.navigation.navigate('Feed')
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Compartilhe uma imagem</Text>
                <View style={styles.imageContainer}>
                    <Image source={this.state.image} style={styles.image} />
                </View>
                
                <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                    <Text style={styles.buttomText}>Escolha a foto</Text>
                </TouchableOpacity>

                <TextInput placeholder='Algum comentário para a fotot ?' 
                    onChangeText={comment => this.setState({ comment })}
                    style={styles.input} value={this.state.comment}  />
        
                <TouchableOpacity onPress={this.save} style={styles.buttom}>
                    <Text style={styles.buttomText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: Platform.Os === 'ios' ? 30 : 30,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#eee',
        marginTop: 10,
    },
    image: {
        width: '100%',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center',
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#fff',
    },
    input: {
        marginTop: 20,
        width: '90%',
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)