import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="preconnect" href="https://hacker-news.firebaseio.com" />
          <link rel="preconnect" href="https://vitals.vercel-insights.com" />

          <meta name="description" content="１日単位で見れる Hacker News" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#242526" media="(prefers-color-scheme: dark)" />
        </Head>

        <body className="bg-[#fafafa] dark:bg-[#242526]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
