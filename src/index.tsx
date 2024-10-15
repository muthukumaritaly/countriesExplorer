
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);  // Make sure the container is not null
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ApolloProvider>
);
