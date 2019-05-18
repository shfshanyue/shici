import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Router, { withRouter } from 'next/router'

Router.events.on('routeChangeComplete', url => {
  _hmt && _hmt.push(['_trackPageview', url])
})

const App = ({ children, title='', description, router }) => {
  const desc = description ? description.slice(0, 100) : '诗词学习网致力于古诗文的整理，为每一个人传递中国诗词之美'
  return (
    <div>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html {
          font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif;
          font-size: 16px;
        }
        body {
          margin: 0;
          background-color: #f6f6f6;
          color: rgba(0,0,0,0.8);
          font-size: 1rem;
        }
        h1, .h1 {
          font-size: 2rem;
        }

        h2, .h2 {
          font-size: 1.5rem;
        }

        h3, .h3 {
          font-size: 1.2rem;
        }

        h4, .h4 {
          font-size: 1rem;
        }
        a {
          text-decoration: none;
          transition: all .3s ease;
        }
        // a:visited {
        //   color: #444; 
        // }
        a,
        a:hover {
          color: #f60; 
        }
        p {
          font-size: 16px;
          line-height: 1.8em;
          margin: .8em 0;
        }
        article {
          margin: 0 auto;
          max-width: 650px;
        }
        input:focus,
        button:focus {
          outline: none;
        }

        .container {
          margin: 0 auto;
          padding: 0 15px;
        }

        .highlight {
          color: #f60; 
          font-style: italic;
        }

        .text-center {
          text-align: center; 
        }

        main {
          padding-top: 73px; 
          min-height: 85vh;
        }

        @media (max-width: 575px) {
          aside {
            display: none; 
          }
          .container {
            padding: 0; 
          }
          ul {
            padding-left: 20px; 
          }
          main {
            padding-top: 54px; 
          }
          .hidden-xs {
            display: none; 
          }
          .visible-xs {
            display: flex; 
          }
        }

        @media (min-width: 576px) {
          .container {
            max-width: 540px;
          }
        }

        @media (min-width: 768px) {
          .container {
            max-width: 720px;
          }
        }

        @media (min-width: 992px) {
          .container {
            max-width: 980px;
          }
        }
      `}</style>
      <Head>
        <title>{ `${title}_诗词弦歌网` }</title>
        <meta charSet="utf-8" />
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
        <meta name="google-site-verification" content="2H9Cp-hVZdcskG17TqEvZp8zOzY2WA1rX8-m2q2YHLQ" />
        <meta name="360-site-verification" content="6fa6e9245d777295b81853aeaaa51ab3" />
        <meta name="msvalidate.01" content="84A630C76DA80A680E0EDC5B7D4EBCE3" />
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        
        <meta property="og:url" content={`https://shici.xiange.tech${router.asPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://shici.xiange.tech/static/shici.png" />
        <meta property="og:site_name" content="诗词弦歌网" />
        <meta property="og:type" content="article" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?7855bd4da8910ecaab721ced4cd01619";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `
          }}
        />
      </Head>
      <Header />
      <main>{ children }</main>
      <Footer />
    </div>
  )
}

export default withRouter(App)
