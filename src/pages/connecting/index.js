import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import ConnectionFeed from '@/components/Connecting/ConnectionFeed';
import ConnectWithOthers from '@/components/Connecting/ConnectWithOthers';
import TabSelector from '@/components/Layout/TabSelector';
import { useState } from 'react';
import { parse } from 'cookie';

const Connecting = () => {
  const [activeTab, setActiveTab] = useState('Connecting Feed');

  const onTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AuthenticatedNavBar />
      <div className="px-5 md:px-28">
        <TabSelector
          firstTabName={'Connecting Feed'}
          secondTabName={'Connect with others'}
          onTabChange={onTabChange}
          activeTab={activeTab}
        />
      </div>
      <div className="px-1 md:px-20">
        {activeTab === 'Connect with others' && <ConnectWithOthers />}
        {activeTab === 'Connecting Feed' && <ConnectionFeed />}
      </div>
    </div>
  );
};

export default Connecting;

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
