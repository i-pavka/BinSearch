import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./main/ui/App";
import {Provider} from 'react-redux';
import {store} from "./main/bll/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

reportWebVitals();
