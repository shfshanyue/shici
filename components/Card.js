import React from 'react'

export default ({ children, loading }) => (
  <div className={`card ${loading ? 'loading' : ''}`}>
    {
      children
    }
    <style jsx>{`
      .card {
        padding: 20px; 
        background-color: #fff;
        margin-bottom: 20px;
        transition: all ease-out 0.2s;
      }

      .card.loading {
        opacity: 0.4;
        height: 200px;
      }
    `}</style>
  </div>
)
