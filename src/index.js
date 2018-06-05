import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache()});
const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
