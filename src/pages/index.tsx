import { GetStaticProps } from 'next';
import Head from 'next/head';
import { initialState as days } from '../modules/days';
import { initialState as stories, Stories } from '../modules/stories';

const Index = () => (
  <>
    <Head>
      <title>ハッカー毎日</title>
    </Head>

    <Stories />
  </>
);

const getStaticProps: GetStaticProps = async () => ({
  props: {
    initialState: {
      days,
      stories,
    },
  },
});

export { getStaticProps };

export default Index;
