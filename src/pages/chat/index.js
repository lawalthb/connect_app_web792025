import ChatView from '@/components/Chat';
import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import { parse } from 'cookie';

const Chat = () => {
  return (
    <div>
      <AuthenticatedNavBar />
      <ChatView />
    </div>
  );
};

export default Chat;

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
