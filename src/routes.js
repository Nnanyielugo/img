import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import ReactApp from '../components/ReactApp';
import MainPage from '../components/MainPage';
import ImagePage from '../components/ImagePage';


export default(
		<Route path='/' component={MainPage}>
			<IndexRoute component={ReactApp}/>
		</Route>
);

