import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="120x120" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/site.webmanifest" rel="manifest" />
          <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="https://hacker-news.firebaseio.com" rel="preconnect" />
          <link href="https://vitals.vercel-insights.com" rel="preconnect" />

          <meta content="１日単位で見れる Hacker News" name="description" />
          <meta content="#2b5797" name="msapplication-TileColor" />
          <meta content="#fafafa" media="(prefers-color-scheme: light)" name="theme-color" />
          <meta content="#242526" media="(prefers-color-scheme: dark)" name="theme-color" />
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
