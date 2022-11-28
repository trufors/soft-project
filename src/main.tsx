import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </HashRouter>
  </StrictMode>,
);
