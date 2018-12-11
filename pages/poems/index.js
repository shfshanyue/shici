import React from 'react'
import { Alert } from 'antd'

import App from '../../components/App'
import Header from '../../components/Header'

import PoemList from './PoemList'

export default () => (
  <App title="首页">
    <PoemList />
  </App>
)
