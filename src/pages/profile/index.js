import UserProfile from '@/components/Connecting/UserProfile';
import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import Loader from '@/components/Loader/Loader';
import useUserStore from '@/zustandStore/useUserStore';
import { parse } from 'cookie';

const Profile = () => {
  const { user, loading } = useUserStore();

  if (loading) return <Loader />;

  return (
    <div>
      <AuthenticatedNavBar />
      {user && (
        <div className="px-10 md:px-20 lg:w-max mx-auto my-20">
          <UserProfile userData={user} />
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
    props: {},
  };
}
