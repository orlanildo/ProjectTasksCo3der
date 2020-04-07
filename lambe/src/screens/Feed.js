import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
    state= {
        post: [{
            id: Math.random(),
            nickname: 'Rafael Pereira Filho',
            email: 'refaelprrflh@mail.com',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickname: 'John',
                comment: 'Stunning'
            }, {
                nickname: 'Ana',
                comment: 'foto linda'
            }, {
                nickname: 'John',
                comment: 'Stunning'
            }]
        }, {
            id: Math.random(),
            nickname: 'Francisco',
            email: 'fllima@gmail.com',
            image: require('../../assets/imgs/bw.jpg'),
            comments: [{
                nickname: 'John',
                comment: 'Stunning'
            }]
        }]
    }

    render(){
        return(
            <View style={styles.container}>
                <Header />
                <FlatList data={this.state.post} keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Post key={item.id} {...item} /> } />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }
})

export default Feed