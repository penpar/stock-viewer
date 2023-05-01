import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // index.css 파일을 임포트합니다.

ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);