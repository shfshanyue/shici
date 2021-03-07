import React, { CSSProperties, StyleHTMLAttributes } from 'react'
import { useState } from 'react'

interface Props {
  defaultValue: string
  placeholder: string
  onSearch: (value: string) => void
  style?: CSSProperties
}

const Search: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState(props.defaultValue || '将进酒')

  return (
    <div className="search">
      <style jsx>{`
        .search {
          display: flex;
          font-size: 14px;
          align-items: center;
        }

        input {
          border-radius: 4px 0 0 4px;
          font-variant: tabular-nums;
          margin: 0;
          padding: 0;
          position: relative;
          display: inline-block;
          padding: 4px 11px;
          width: 200px;
          height: 32px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.65);
          background-color: #fff;
          background-image: none;
          border: 1px solid #d9d9d9;
          transition: all 0.4s;
          font-size: 14px;

          display: table-cell;
          border-right: none;
        }

        input:focus {
          border-color: #f60;
        }

        span {
          height: 32px;
          line-height: 32px;
          background-color: #f60;
          display: inline-block;
          padding: 0 15px;
          border-radius: 0 4px 4px 0;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
      <input
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') props.onSearch(value)
        }}
        placeholder={props.placeholder}
        value={value}
        style={props.style}
      />
      <span onClick={() => props.onSearch(value)}>搜索</span>
    </div>
  )
}

export default Search
