import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import App from './components/App';
import MainRecipe from './components/MainRecipe';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import SearchResults from './components/SearchResults';
import ImageUpload from './components/ImageUpload.js';
import CreateRecipe from './components/CreateRecipe';
import Landing from './components/Landing';

import rootReducer from './reducers';

const middleware = routerMiddleware(browserHistory);

// createStore accepts a single reducer or a collection of reducers
const store = createStore(rootReducer, applyMiddleware(middleware));

const history = syncHistoryWithStore(browserHistory, store);

const render = function () {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/landing" component={Landing} />
            <Route path="/discover" component={Discover} />
            <Route path="/profile/:user_id" component={Profile} />
            <Route path="/recipe/:id" component={MainRecipe} />
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
