import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from '../src/App';
import * as serviceWorker from './serviceWorker';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import { Provider, useDispatch } from 'react-redux';
import { loadState, saveState } from './localStorage';
import store, { Persistor } from './redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { useEffect } from 'react';

import Footer from './components/Footer';

const persistedState = loadState();


ReactDOM.render(
  <>
    <HelmetProvider>
      <Provider store={store}>
        <SidebarProvider>
          <PersistGate persistor={Persistor}>
            <Router>
              <App />
            </Router>
          </PersistGate>
        </SidebarProvider>
      </Provider>
    </HelmetProvider>
  </>,
  document.getElementById('root')
);

serviceWorker.unregister();
