import React from 'react'
import { Provider } from 'react-redux'
import registerRootComponent from './node_modules/expo/build/launch/registerRootComponent'

import storeConfig from './src/store/storeConfig'
import App from './src/App';

import axios from  'axios'
axios.defaults.baseURL = 'https://lambefirebase.firebaseio.com/'


const store = storeConfig()

const Redux = () => (
    <Provider store={store} >
        <App />
    </Provider>
)

registerRootComponent(Redux);