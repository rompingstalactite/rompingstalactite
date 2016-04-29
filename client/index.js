// this is the main entry point for the app
// it renders the App component after wrapping it in the Provider from Redux

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

import App from './components/App.js';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state
// the store manages the state of our app
// createStore accepts a single reducer or a collection of reducers
const store = createStore(rootReducer, initialState);

var render = function() {
  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('app')
  );
};

render();