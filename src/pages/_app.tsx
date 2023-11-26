import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import { CustomStateProvider } from '../components/Context';
import { store } from '../query/store';
import '../styles/Details.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CustomStateProvider>
        <Component {...pageProps} />
      </CustomStateProvider>
    </Provider>
  );
}

export default MyApp;
