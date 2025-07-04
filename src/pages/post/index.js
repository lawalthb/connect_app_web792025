import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import PostFeed from '@/components/PostFeed';
import { parse } from 'cookie';

const Post = () => {
  return (
    <div className="px-5 md:px-28">
      <AuthenticatedNavBar />
      <div className="my-20">
        <PostFeed />
      </div>
    </div>
  );
};

export default Post;

export async function getServerSideProps({ req }) {
  const { token } = parse(req.headers.cookie || '');

  if (!token) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  return {
    props: {},
  };
}
