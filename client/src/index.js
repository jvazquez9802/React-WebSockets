import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './componentes/App'

ReactDOM.render((
  <React.StrictMode>
      <App/>
  </React.StrictMode>
    
  ),
  document.getElementById('root')
);
reportWebVitals();
