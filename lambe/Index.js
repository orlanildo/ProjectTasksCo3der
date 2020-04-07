import React from 'react'
import { Provider } from 'react-redux'
//import registerRootComponent from 'expo/build/launch/registerRootComponent';
import registerRootComponent from './node_modules/expo/build/launch/registerRootComponent';

import storeConfig from './src/store/storeConfig'
import Navigator from './src/Navigator';


const store = storeConfig()

const Redux = () => (
    <Provider store={store} >
        <Navigator />
    </Provider>
)

registerRootComponent(Redux);