import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import Stream from '@/components/Streams';
import { parse } from 'cookie';

const Livestream = () => {
  return (
    <div>
      <AuthenticatedNavBar />
      <section className="flex justify-center py-32">
        <Stream />
      </section>
    </div>
  );
};

export default Livestream;

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
