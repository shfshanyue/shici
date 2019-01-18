import React from 'react'
import Skeleton from './Skeleton'

export default ({ children, loading }) => (
  <div className={`card ${loading ? 'loading' : ''}`}>
    <Skeleton active loading={loading}>
      { children }
    </Skeleton>
    <style jsx>{`
      .card {
        padding: 20px; 
        background-color: #fff;
        margin-bottom: 15px;
        transition: all ease-out 0.2s;
        opacity: 1;
      }

      @media (max-width: 575px) {
        .card {
          margin-bottom: 1px;
        }
      }

      .card.loading {
        height: 200px;
        opacity: 0.7;
      }
    `}</style>
  </div>
)
