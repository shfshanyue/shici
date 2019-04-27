import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

import config from '../config'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            Authorization: process.browser && localStorage.token
          }
        });
        return forward(operation)
      }),
      new HttpLink({
        uri: config.url,
        credentials: 'same-origin',
        fetch (uri, options) {
          const { operationName } = JSON.parse(options.body)
          return fetch(`${uri}?query=${operationName}`, options)
        }
      })
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
