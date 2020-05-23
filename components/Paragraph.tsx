import Highlighter from 'react-highlight-words'
import Card from './Card'

interface Props {
  title: string;
  text?: string[];
  loading: boolean;
  highlight?: boolean;
};

function Paragraph ({ title, text, loading, highlight }: Props ) {
  return loading || text ? (
    <Card loading={loading}>
      <style jsx>{`
      p {
        text-indent: 2em; 
      }
      `}</style>
      <h3>{title}</h3>
      {
        text?.map((t: any) => <p key={t}>
          {
            highlight ?
              <Highlighter
                highlightClassName="highlight"
                highlightTag="span"
                searchWords={[/「.+?」/, /“.+?”/, /《.+?》/] as any as string[]}
                textToHighlight={t}
              /> : t
          }
        </p>)
      }
    </Card>
  ) : null
}


export default Paragraph
