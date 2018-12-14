import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default ({ children, title='', description='' }) => (
  <div>
    <style jsx global>{`
      * {
        font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
          'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
          monospace, serif;
      }
      body {
        margin: 0;
        background-color: #f6f6f6;
        color: rgba(0,0,0,0.8);
      }
      a {
        text-decoration: none;
      }
      a.active,
      a:hover {
      }
      p {
        font-size: 14px;
        line-height: 24px;
        margin: 1em 0;
      }
      .ant-skeleton-paragraph {
        padding: 0; 
      }
      article {
        margin: 0 auto;
        max-width: 650px;
      }
      button {
        align-items: center;
        background-color: #22bad9;
        border: 0;
        color: white;
        display: flex;
        padding: 5px 7px;
      }
      button:active {
        background-color: #1b9db7;
        transition: background-color 0.3s;
      }
      button:focus {
        outline: none;
      }
      .container {
        width: 960px; 
        margin: 0 auto;
      }
    `}</style>
    <Head>
      <title>{ `${title} - 诗词学习网` }</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
    </Head>
    <Header />
    <main>{ children }</main>
    <Footer />
  </div>
)
