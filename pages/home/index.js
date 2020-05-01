import App from '../../components/App'
import withApollo from '../../lib/with-apollo'

const Home = () => (
  <App>
    Hello, APP
  </App>
)

export default withApollo(Home)