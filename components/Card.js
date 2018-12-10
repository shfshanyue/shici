import React from 'react'
import { Skeleton } from 'antd'

export default ({ children, loading }) => (
  <div className={`card ${loading ? 'loading' : ''}`}>
    <Skeleton active loading={loading}>
      { children }
    </Skeleton>
    <style jsx>{`
      .card {
        padding: 20px; 
        background-color: #fff;
        margin-bottom: 20px;
        transition: all ease-out 0.2s;
        opacity: 1;
      }

      .card.loading {
        height: 200px;
        opacity: 0.7;
      }
    `}</style>
  </div>
)
