import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import Loader from '@/components/Loader/Loader';
import PostFeed from '@/components/PostFeed';
import { getSocialCircles } from '@/components/Utils/api';
import { useQuery } from '@tanstack/react-query';
import { parse } from 'cookie';

const Post = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getSocialCircles,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="px-5 md:px-28">
      <AuthenticatedNavBar />
      <div className="my-20">
        {!isLoading && <PostFeed socialCircles={data?.data?.social_circles} />}
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
