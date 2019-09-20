import Icon from './Icon'

interface Props {
  current: number;
  total: number;
  pageSize: number;
  onChange: (to: number) => void;
}

function Pagination({ current, total, pageSize = 10, onChange }: Props) {
  const pageCount = Math.ceil(total / pageSize)
  const showPageCount = Math.min(pageCount, 5)
  let start: number

  if (pageCount === 1) return null

  if (current <= 3 || pageCount <= 5) {
    start = 1
  } else if (current > pageCount - 3) {
    start = pageCount - 4
  } else {
    start = current - 2
  }

  function handleChange(to: number) {
    if (to >= 1 && to <= pageCount && to !== current) {
      window && window.scrollTo(0, 0)
      onChange(to);
    }
  }

  return (
    <div className="pagination">
      <style>{`
        .pagination {
          display: flex; 
        }

        .pagination-item {
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          height: 32px;
          width: 32px;
          background: #ffffff;
          border: 1px solid #d9d9d9;
          cursor: pointer;
          margin-right: 8px;
          outline: none;
          border-radius: 4px;
          font-size: 14px;
          color: rgba(0, 0, 0, .65);
          transition: all 0.4s ease;
        }

        @media (max-width: 575px) {
          .pagination-item {
            display: none; 
            height: 50px;
          }
          .pagination-direction-left,
          .pagination-direction-right {
            display: flex;
            justify-content: center;
            margin: 0;
            border: 0;
            border-radius: 0;
            flex-grow: 1; 
          }
        }

        .pagination-item.active,
        .pagination-item:hover {
          color: #f60; 
          border: 1px solid #f60;
        }

        .pagination-item.inactive {
          color: rgba(0,0,0,0.25); 
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      `}</style>
      <div
        className={current === 1 ? 'pagination-item pagination-direction-left inactive' : 'pagination-item pagination-direction-left'}
        onClick={() => handleChange(current - 1)}
      >
        <Icon type="left" />
      </div>
      {
        Array.from({ length: showPageCount }, (_, idx) => {
          const index = idx + start;

          return (
            <div
              key={idx}
              className={index === current ? 'pagination-item active' : 'pagination-item'}
              onClick={() => handleChange(index)}
            >
              { index }
            </div>
          );
        })
      }
      <div
        className={current === pageCount ? 'pagination-item pagination-direction-right inactive' : 'pagination-item pagination-direction-right'}
        onClick={() => handleChange(current + 1)}
      >
        <Icon type="right" />
      </div>
    </div>
  )
}

export default Pagination
