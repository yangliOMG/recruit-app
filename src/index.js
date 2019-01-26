import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,compose  } from 'redux';

// import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './app.jsx'
import reducer from './reducer.jsx'
// import {rootSaga} from './redux/saga'
import './index.css'
// const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, 
    // applyMiddleware(sagaMiddleware)
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
// sagaMiddleware.run(rootSaga)

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