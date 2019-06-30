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
        } 
      `}</style>       
    </div>
  )
}

export default Avator
