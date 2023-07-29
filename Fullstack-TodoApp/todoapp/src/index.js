import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Modal from 'react-modal'//React-modal import edildi
import store from './Store/store' //store import edildi
import { Provider } from 'react-redux'; //Provider import edildi

Modal.setAppElement('#root')// ekran okuyucularının modal açıldığında ana içeriği görmemesini sağlamak için 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);

