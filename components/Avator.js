function Avator ({ name }) {
  return (
    <div className="avator">
      { name[0] }
      <style jsx>{`
        .avator {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 40px;
          height: 40px;
          background-color: #f60e;
          border-radius: 50%;
          color: #fff;
          font-size: 22px;

          animation: .3s ease show;
        } 

        @keyframes show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>       
    </div>
  )
}

export default Avator
