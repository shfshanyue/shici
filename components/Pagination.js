import Icon from './Icon'

function Pagination({ current, total, pageSize = 10, onChange }) {
  const pageCount = Math.ceil(total / pageSize)
  const showPageCount = Math.min(pageCount, 5)
  let start

  if (pageCount === 1) return null

  if (current < 4) {
    start = 1
  } else if (current > pageCount - 3) {
    start = pageCount - 4
  } else {
    start = current - 2
  }

  function handleChange(to) {
    if (to >= 1 && to <= pageCount && to !== current) {
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
          user-select: none;
          height: 32px;
          width: 32px;
          line-height: 32px;
          text-align: center;
          vertical-align: middle;
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
  );
}

export default Pagination
