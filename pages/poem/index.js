import React from 'react'

import App from '../../components/App'
import Header from '../../components/Header'

import Poem from './Poem'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return query
  }

  render () {
    return (
      <App>
        <Poem uuid={this.props.uuid} />
      </App>
    )
  }
}
