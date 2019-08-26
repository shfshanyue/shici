import App from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

class MyApp extends App {
  // componentDidMount () {
    // const dev = process.env.NODE_ENV === 'development'
    // if (process.browser && !dev && navigator.serviceWorker) {
    //   navigator.serviceWorker
    //     .register('/service-worker.js')
    //     .then(registration => {
    //       console.log('service worker registration successful')
    //     })
    //     .catch(err => {
    //       console.warn('service worker registration failed', err.message)
    //     })
    // }
  // }

  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
