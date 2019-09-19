const Footer = () => (
  <footer>
    <div className="container">
      <a href="http://www.aka.today/">阿卡俱乐部</a>
    </div>
    <style jsx>{`
      .container {
        border-top: 1px solid #eaeaea;
      }

      footer {
        height: 53px;
        line-height: 53px;
        margin-top: 30px;
      }
      a {
        font-size: 18px;
        margin-right: 15px;
        color: #888;
      }
      a:hover {
        color: #f60; 
      }
    `}</style>
  </footer>
)

export default Footer
