import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const PoemList = ({ ping }) => (
  <div>
    { ping } 
  </div>
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
)(PoemList)
