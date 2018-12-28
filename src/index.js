import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'

import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './app.jsx'
import reducer from './reducer.jsx'
import './index.css'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, 
    applyMiddleware(sagaMiddleware)
    // compose(
    //     applyMiddleware(thunk),
    //     window.devToolsExtension?window.devToolsExtension():f=>f
    // )
)

const root = document.getElementById('root')
const renderOrHydrate = root.innerHTML.trim().length ? 'hydrate' : 'render'

ReactDOM[renderOrHydrate](
    (
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider> 
    )
    , 
    root
);