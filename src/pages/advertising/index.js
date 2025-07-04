import Advert from '@/components/Advert';
import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import { parse } from 'cookie';

const Advertising = () => {
  return (
    <div>
      <AuthenticatedNavBar />
      <section>
        <Advert />
      </section>
    </div>
  );
};

export default Advertising;

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
