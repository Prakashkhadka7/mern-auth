import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor} from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  {/* </React.StrictMode> */}
  </Provider>,
)
