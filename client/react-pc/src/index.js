import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {rootStore} from './store/RootStore';

ReactDOM.render(<App rootStore={rootStore} />, document.getElementById('root'));
registerServiceWorker();
