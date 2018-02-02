import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from "redux";
import {Provider} from "react-redux";

import Plateau from "./plateau";

import {monReducer} from './reducers';

const root = document.getElementById('app-content');

let store = createStore(
  monReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <Plateau/>
    </Provider>,
    root
);
