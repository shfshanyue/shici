import Link from 'next/link'
import { withRouter } from 'next/router'

const Footer = () => (
  <footer>
    <div className="container">
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
      }
    `}</style>
  </footer>
)

export default withRouter(Footer)
