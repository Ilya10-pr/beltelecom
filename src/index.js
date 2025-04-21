import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  import store from './store/store'
  import { Provider } from 'react-redux'

  const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient} >
            <Provider store={store} >
             <App />
            </Provider>
        </QueryClientProvider>
    </BrowserRouter>
);

