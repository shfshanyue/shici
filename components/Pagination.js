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
        <svg viewBox="64 64 896 896" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
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
        <svg viewBox="64 64 896 896" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
      </div>
    </div>
  );
}

export default Pagination
