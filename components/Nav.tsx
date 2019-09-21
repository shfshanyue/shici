const Nav = ({ children }) => {
  return (
    <div className="nav">
      <style jsx>{`
        .nav {
          display: flex;
          height: 50px;
          align-items: center;
          margin: 0 auto;
          white-space: nowrap;
          border-bottom: 1px solid #eee;
          background-color: #fff;
        }
      `}</style>
      { children }
    </div>
  )
}

Nav.Item = ({ children }) => {
  return (
    <div className="nav-item">
      <style jsx>{`
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 20px;
          cursor: pointer;
          height: 100%;
          color: #888;
        }

        .nav-item.active {
          color: #f60;
          box-shadow: inset 0 -2px 0 #f60;
        }
      `}</style>
      { children }
    </div>
  )   
}

export default Nav
