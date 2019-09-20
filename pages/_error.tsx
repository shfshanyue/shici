import App from '../components/App'
import Card from '../components/Card'

function Error () {
  return (
    <App title="未找到">
      <style jsx>{`
      .card {
        width: 600px; 
        height: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -300px;
        margin-top: -50px;
      } 

      .title {
        margin-top: 18px; 
        text-align: right;
      }
      `}</style>
      <div className="card">
        <Card>
          <div>
            众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。
          </div>
          <div className="title">
            ------ 青玉案 · 元夕 
          </div>
        </Card>
      </div>
    </App>
  )
}

export default Error
