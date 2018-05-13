import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import createStore from './redux/create';
import './index.css';
import NpvCalculator from './components/NpvCalculator';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <NpvCalculator />
  </Provider>,
  document.getElementById('root'),
);
/* eslint-enable */

registerServiceWorker();
