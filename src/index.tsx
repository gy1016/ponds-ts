import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { AppProviders } from '@/context';
import App from './App';
import 'antd/dist/antd.less';

ReactDOM.render(
  <HashRouter>
    <AppProviders>
      <App />
    </AppProviders>
  </HashRouter>,
  document.getElementById('root'),
);
