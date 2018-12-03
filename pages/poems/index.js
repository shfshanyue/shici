import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import App from '../../components/App'
import Header from '../../components/Header'

const Poem = ({ ping }) => (
  <App>
    <Header></Header>
    { ping }
  </App>
)

export default compose(
  graphql(gql`
    {
      ping
    }
  `, {
    props ({ data }) {
      return {
        ping: data.ping
      }
    }
  }),
)(Poem)
