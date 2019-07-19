import Highlighter from 'react-highlight-words'
import { map } from '../lib/utils'
import Card from './Card'

const Paragraph = ({ title, text, loading, highlight }) => loading || text ? (
  <Card loading={loading}>
    <style jsx>{`
      p {
        text-indent: 2em; 
      } 
    `}</style>
    <h3>{ title }</h3>
    {
      map(text, (t, index) => <p key={index}>
        {
          highlight ?
            <Highlighter
              highlightClassName="highlight"
              highlightTag="span"
              searchWords={[/「.+?」/, /“.+?”/]}
              textToHighlight={t}
            /> : t
        }
      </p>)
    }
  </Card>
) : null

export default Paragraph
