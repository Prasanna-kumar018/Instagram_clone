import React from 'react';
import ReactDOM from 'react-dom/client';
import {  ChakraProvider } from "@chakra-ui/react";
// import { mode } from '@chakra-ui/theme-tools'
import { App } from './App'
import { Success } from "./components/success";
import { Provider } from 'react-redux';
import { store } from './store/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
  <Provider store={store}>
      <ChakraProvider>
          <Success />
          <App />
      </ChakraProvider>
  </Provider>
    </React.StrictMode>
);