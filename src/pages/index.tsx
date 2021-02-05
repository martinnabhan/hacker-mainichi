import { GetStaticProps } from 'next';
import { initialState as days } from '../modules/days';
import { initialState as stories, Stories } from '../modules/stories';

const Index = () => <Stories />;

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
