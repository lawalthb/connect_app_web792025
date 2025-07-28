import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import ConnectionFeed from '@/components/Connecting/ConnectionFeed';
import ConnectWithOthers from '@/components/Connecting/ConnectWithOthers';
import TabSelector from '@/components/Layout/TabSelector';
import { useEffect, useState } from 'react';
import { parse } from 'cookie';
import useUserStore from '@/zustandStore/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { getPost, getSocialCircles } from '@/components/Utils/api';
import Loader from '@/components/Loader/Loader';
import Discovery from '@/components/Connecting/Discovery';

const Connecting = () => {
  const [activeTab, setActiveTab] = useState('Connecting Feed');
  const { user, loading, refreshUser } = useUserStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post'],
    queryFn: getPost,
  });

  const {
    data: socialCircles,
    isLoading: isLoadingSocialCircles,
    isError: isSocialCirclesError,
    error: socialCirclesError,
  } = useQuery({
    queryKey: ['socialCircle'],
    queryFn: getSocialCircles,
  });

  // console.log(loading, 'loading');
  // useEffect(() => {
  //   refreshUser();
  // }, []);

  const onTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AuthenticatedNavBar />
      <div className="px-5 md:px-28">
        <TabSelector
          firstTabName={'Connecting Feed'}
          secondTabName={'Category'}
          thirdTabName={'Discovery'}
          onTabChange={onTabChange}
          activeTab={activeTab}
        />
      </div>
      {(isLoading || isLoadingSocialCircles) && <Loader />}
      {!isLoading && !isLoadingSocialCircles && (
        <div className="px-1 md:px-20">
          {activeTab === 'Category' && (
            <ConnectWithOthers
              socialCircles={socialCircles?.data?.social_circles}
            />
          )}
          {activeTab === 'Connecting Feed' && (
            <ConnectionFeed data={data?.data} />
          )}
          {activeTab === 'Discovery' && <Discovery data={data?.data} />}
        </div>
      )}
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
