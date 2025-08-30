import UserProfile from '@/components/Connecting/UserProfile';
import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import Loader from '@/components/Loader/Loader';
import {
  getMyStory,
  getOtherStory,
  getSocialCircles,
} from '@/components/Utils/api';
import useUserStore from '@/zustandStore/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { parse } from 'cookie';

const Profile = ({ token }) => {
  const { user, loading } = useUserStore();

  const {
    data: socialCircles,
    isLoading: isLoadingSocialCircles,
    isError: isSocialCirclesError,
    error: socialCirclesError,
  } = useQuery({
    queryKey: ['socialCircle'],
    queryFn: getSocialCircles,
  });

  const { data: myStoryData, isLoading: isLoadingMyStory } = useQuery({
    queryKey: ['myStory'],
    queryFn: getMyStory,
  });

  const { data: otherStoryData, isLoading: isLoadingOtherStory } = useQuery({
    queryKey: ['otherStory'],
    queryFn: getOtherStory,
  });

  if (
    loading ||
    isLoadingSocialCircles ||
    isLoadingMyStory ||
    isLoadingOtherStory
  )
    return <Loader />;

  return (
    <div>
      <AuthenticatedNavBar />
      {user && (
        <div className="px-10 md:px-20 lg:w-max mx-auto my-20">
          <UserProfile
            userData={user}
            socialCircles={socialCircles?.data?.social_circles}
            myStoryData={myStoryData}
            otherStoryData={otherStoryData}
            token={token}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { token } = parse(req.headers.cookie || '');

  if (!token) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  return {
    props: { token },
  };
}
