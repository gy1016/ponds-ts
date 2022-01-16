import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/context';
import App from './App';
import 'antd/dist/antd.less';

ReactDOM.render(
  <BrowserRouter>
    <AppProviders>
      <App />
    </AppProviders>
  </BrowserRouter>,
  document.getElementById('root'),
);
