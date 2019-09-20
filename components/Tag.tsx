import { CSSProperties, MouseEventHandler } from 'react'

interface Props {
  children: React.ReactChildren;
  checked?: boolean;
  onChange?: MouseEventHandler;
  style?: CSSProperties;
}

function Tag ({ checked, onChange, children, style }: Props) {
  return (
    <div className={`tag ${checked ? 'active' : ''}`} onClick={onChange} style={style}>
      <style jsx>{`
        .tag {
          display: inline-block; 
          padding: 3px 8px;
          margin-right: 10px;
          border: 1px solid #f608;
          color: #f60c;
          cursor: pointer;
          font-size: .9em;
        }

        .tag:hover {
          background-color: #f601;
        } 

        .tag.active {
          background-color: #f60;
          color: #fff;
        }

        @keyframes show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      { children } 
    </div>
  )
}

export default Tag
