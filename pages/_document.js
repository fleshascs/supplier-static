import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#000000' />
          <meta name='application-name' content={process.env.siteName} />
        </Head>
        <body style={{ backgroundColor: 'rgb(245 247 250)' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
