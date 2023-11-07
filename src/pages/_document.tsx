// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add your custom font link here */}
          <link href="https://fonts.googleapis.com/css2?family=Heuristica&display=swap" rel="stylesheet" />
          {/* Other head tags */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
