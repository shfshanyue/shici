import Skeleton from './Skeleton'

interface Props {
  children?: any;
  loading?: boolean;
  title?: string;
}

function Card ({ children, loading, title }: Props) {
  return (
    <div >
      {
        title && 
          <div className="header">
            { title }
          </div>
      }
      <div className={`card ${loading ? 'loading' : ''}`}>
        <Skeleton loading={loading}>
          { children }
        </Skeleton>
      </div>
      <style jsx>{`
      .card {
        padding: 20px; 
        background-color: #fff;
        margin-bottom: 15px;
        transition: all ease-out 0.2s;
        box-shadow: 0 1px 3px rgba(20,20,20,.1);
        opacity: 1;
      }

      .header {
        background-color: #fff;
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 20px;
      }

      @media (max-width: 575px) {
        .card {
          margin-bottom: 1px;
        }
      }

      .card.loading {
        height: 200px;
        opacity: 0.7;
      }
    `}</style>
    </div>
  )
}

export default Card
