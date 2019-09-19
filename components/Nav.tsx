const Nav = () => {
  return (
    <div className="avator">
      { name[0] }
      <style jsx>{`
        .avator {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 40px;
          height: 40px;
          background-color: #f60e;
          border-radius: 50%;
          color: #fff;
          font-size: 22px;

          animation: .3s ease show;
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
    </div>
  )
}
//           .nav {
//             display: flex;
//             height: 50px;
//             align-items: center;
//             margin: 0 auto;
//             white-space: nowrap;
//             border-bottom: 1px solid #eee;
//             background-color: #fff;
//           }

//           .nav-item {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             position: relative;
//             padding: 0 20px;
//             cursor: pointer;
//             height: 100%;
//             color: #888;
//           }

//           .nav-item.active {
//             color: #f60;
//             box-shadow: inset 0 -2px 0 #f60;
//           }
// ```

Nav.Item = () => {
   
}

export default Nav
