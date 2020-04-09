import { ADD_POST, ADD_COMMENT } from "./actionTypes";
import axios from 'axios'


export const addPost = post => {
    return dispatch => {

        axios({
            urk: 'uploadImage',
            baseURL: 'https://us-central1-lambefirebase.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err))
            .then(res => {
                post.image = res.data.imageUrl
                axios.post('/posts.json', { ...post })
                    .catch(err => console.log(err))
                    .then(res =>  console.log(res.data))
            })

    }
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload
    }
}