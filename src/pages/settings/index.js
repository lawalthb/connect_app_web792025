import GeneralSettings from '@/components/GeneralSettings';
import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import { parse } from 'cookie';

const Settings = () => {
  return (
    <div>
      <AuthenticatedNavBar />
      <GeneralSettings />
    </div>
  );
};

export default Settings;

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
