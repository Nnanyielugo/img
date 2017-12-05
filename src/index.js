require('whatwg-fetch');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';



const app = document.getElementById('app');

ReactDOM.render(
        <Router routes={routes} history={browserHistory}/>, app); 
registerServiceWorker();