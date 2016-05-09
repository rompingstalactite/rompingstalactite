// this is the main entry point for the app
// it renders the App component after wrapping it in the Provider from Redux

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/App';
import MainRecipe from './components/MainRecipe';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import SearchResults from './components/SearchResults';
import ImageUpload from './components/ImageUpload.js';
import CreateRecipe from './components/CreateRecipe';

import rootReducer from './reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state
// the store manages the state of our app
// createStore accepts a single reducer or a collection of reducers
const store = createStore(rootReducer, initialState);

const history = syncHistoryWithStore(browserHistory, store);

const render = function () {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/recipe" component={MainRecipe} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create" component={CreateRecipe} />
            <Route path="/search" component={SearchResults} />
            <Route path="/*" component={Dashboard} />
          </Route>
        </Router>
      </div>

    </Provider>,
    document.getElementById('app')
  );
};

render();
store.subscribe(render);
