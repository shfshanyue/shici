import React from 'react'

interface Props {
  children?: any;
  loading?: boolean;
  line?: number;
}

function Skeleton ({ loading, children, line = 4 }: Props) {
  return loading ? (
    <div>
      <style jsx>{`
        .title,
        .paragraph {
          background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
          background-size: 400% 100%;
          animation: loading 1.4s ease infinite;
          height: 16px;
          margin-top: 15px;
        }

        .title {
          width: 38%;
        }

        .paragraph {
          list-style: none;
          width: 100%;
        }

        .paragraphs {
          margin: 24px 0 20px; 
        }

        @keyframes loading {
          0% {
            background-position: 100% 50%;
          }

          100% {
              background-position: 0 50%;
          }
        }
      `}</style>
      <div className="title"></div>  
      <div className="paragraphs">
        {
          Array.from({ length: line }, (p, index) =>
            <div className="paragraph" key={index}></div>
          ) 
        }
      </div>
    </div>
  ) : children
}

export default Skeleton
