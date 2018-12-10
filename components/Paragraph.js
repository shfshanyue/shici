import _ from 'lodash'
import Card from './Card'

const Paragraph = ({ title, text, loading }) => text ? (
  <Card loading={loading}>
    <h3>{ title }</h3>
    { _.map(text, (t, index) => <p key={index}>{t}</p>) }
  </Card>
) : null

export default Paragraph
