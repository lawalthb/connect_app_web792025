import AuthenticatedNavBar from '@/components/Layout/AuthenticatedNavBar';
import ConnectionFeed from '@/components/Connecting/ConnectionFeed';
import ConnectWithOthers from '@/components/Connecting/ConnectWithOthers';
import TabSelector from '@/components/Layout/TabSelector';
import { useEffect, useState } from 'react';
import { parse } from 'cookie';
import useUserStore from '@/zustandStore/useUserStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  explore,
  getPost,
  getProfileImages,
  getSocialCircles,
} from '@/components/Utils/api';
import Loader from '@/components/Loader/Loader';
import Discovery from '@/components/Connecting/Discovery';
import ProfileCourasel from '@/components/ProfileCourasel';
import Modal from '@/components/Modal';
import UserProfile from '@/components/Connecting/UserProfile';

const Connecting = () => {
  const [activeTab, setActiveTab] = useState('Connecting Feed');
  const [showSwipe, setShowSwipe] = useState(false);
  const [optionDetailData, setOptionDetailData] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userId, seUserId] = useState(null);

  const { user, loading, refreshUser } = useUserStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post'],
    queryFn: getPost,
  });

  const { data: profileImages, isLoading: isLoadingProfileImages } = useQuery({
    queryKey: ['profileImages'],
    queryFn: getProfileImages,
  });

  const { mutate, isPending, reset } = useMutation({
    mutationFn: explore,
    onSuccess: (data) => {
      reset();
      setOptionDetailData(data);
    },
    onError: (err) => {
      console.error('Explore users failed:', err.message);
    },
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
  const handleShowSwipePage = (id) => {
    seUserId(id);
    setShowSwipe(true);
    mutate({ social_id: [26] });
  };

  const handleCloseSwipePage = () => {
    setShowSwipe(false);
  };

  const handleViewProfile = () => {
    setProfile((prev) => !prev);
  };

  const handleUserData = (data) => {
    setUserData(data);
  };

  const handleButtonClick = (id) => {
    mutate({ social_id: [id] });
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
      {(isLoading || isLoadingSocialCircles || isLoadingProfileImages) && (
        <Loader />
      )}
      {!isLoading && !isLoadingSocialCircles && !isLoadingProfileImages && (
        <div className="px-1 md:px-20">
          {activeTab === 'Category' && (
            <ConnectWithOthers
              socialCircles={socialCircles?.data?.social_circles}
            />
          )}
          {activeTab === 'Connecting Feed' && (
            <ConnectionFeed
              data={data?.data}
              profileImages={profileImages?.data?.images}
            />
          )}
          {activeTab === 'Discovery' && (
            <Discovery
              data={data?.data}
              handleShowSwipePage={handleShowSwipePage}
            />
          )}
        </div>
      )}

      {showSwipe && (
        <Modal
          isOpen={showSwipe}
          onClose={handleCloseSwipePage}
          title="Connect"
          size="max-w-[905px] max-h-[calc(100vh-50px)] overflow-y-scroll"
        >
          {isPending ? (
            <Loader />
          ) : (
            <ProfileCourasel
              profiles={optionDetailData?.data || []}
              handleViewProfile={handleViewProfile}
              socialId={[26]}
              handleUserData={handleUserData}
              handleButtonClick={handleButtonClick}
            />
          )}
        </Modal>
      )}

      {profile && (
        <Modal
          isOpen={showSwipe}
          onClose={handleViewProfile}
          size="max-w-[505px] max-h-[calc(100vh-150px)] overflow-y-scroll"
        >
          <UserProfile userData={userData} />
        </Modal>
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
