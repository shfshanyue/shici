import React, { Component } from 'react'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.defaultValue 
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange (e) {
    this.setState({
      value: e.target.value 
    })
  }

  handleSearch () {
    this.props.onSearch(this.state.value) 
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.onSearch(this.state.value) 
    }
  }

  render () {
    const { value } = this.state

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
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        placeholder={this.props.placeholder}
        value={value}
        style={this.props.style}
      />
        <span onClick={this.handleSearch}>搜索</span>
      </div>
    ) 
  }
}

export default Search
