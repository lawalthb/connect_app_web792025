import Daniella from '@/Images/Daniella.png';
import Image from 'next/image';
import ConnectCategiries from './ConnectCategories';
import JustConnectIcon from '@/Images/Icons/JustConnectIcon.svg';
import SportIcon from '@/Images/Icons/SportIcon.svg';
import HealthAndFitness from '@/Images/Icons/HealthAndFitness.svg';
import BusinessIcon from '@/Images/Icons/BusinessIcon.svg';
import ConnectStory from './ConnectStory';
import Feeds from './Feeds';
import { useState } from 'react';
import Modal from '../Modal';
import ProfileDetail from './ProfileDetail';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePost, getUser } from '../Utils/api';
import Loader from '../Loader/Loader';
import useUserStore from '@/zustandStore/useUserStore';
import ReportPostModal from './ReportPostModal';
import ConfirmAd from '../Advert/ConfirmAd';

const UserProfile = ({ userData, socialCircles }) => {
  const [expandImage, setExpandImage] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [feedId, setFeedId] = useState(false);
  const [url, setUrl] = useState('');
  const [reportPost, setReportPost] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { user, loading } = useUserStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getUser', userData.id],
    queryFn: () => getUser(userData.id),
    enabled: !!userData.id,
  });

  const {
    mutate,
    isPending,
    error: errorDeleting,
  } = useMutation({
    mutationFn: ({ id }) => deletePost(id),
    onSuccess: () => {
      setFeedId(null);
      handleConfirmDelete();
    },
    onError: (err) => {
      console.error('Delete failed:', err.message);
    },
  });

  const handleExpandImage = (url) => {
    setUrl(url);
    setExpandImage((prev) => !prev);
  };

  const handleReportPost = () => {
    setReportPost((prev) => !prev);
  };
  const handleConfirmDelete = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleShowMore = (identifier, id) => {
    if (id) {
      setFeedId(id);
    }
    if (identifier === 'post') {
      handleReportPost();
    } else if (identifier === 'delete') {
      handleConfirmDelete();
    }
    setShowMore((prev) => !prev);
  };

  const handleComment = (id) => {
    setFeedId(id);
    setShowComment((prev) => !prev);
  };

  if (isLoading) return <Loader />;

  const user_data = data?.data[0];

  const newObj = {
    profile_url: user_data?.profile_url,
    alt_text: 'Main Picture',
  };
  const profileImages = user_data?.profile_images || [];

  const combinedImages = [newObj, ...profileImages];

  const handleDelete = () => {
    mutate({ id: feedId });
  };

  return (
    <div>
      <div className="relative w-full max-w-[805px] mx-auto pb-12">
        <Swiper
          modules={[EffectFlip, Autoplay, Pagination]}
          effect="flip"
          grabCursor={true}
          loop={true}
          pagination={{ clickable: true }}
          style={{
            '--swiper-pagination-color': '#A20030',
            '--swiper-pagination-bottom': '-30px',
          }}
          className="rounded-[30px]"
        >
          {combinedImages?.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.profile_url}
                alt={`Profile Image ${index + 1}`}
                width={805}
                height={783}
                className="object-cover w-full h-[400px] lg:h-auto rounded-[30px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <style jsx global>{`
          .swiper-pagination {
            border: 1px solid #a20030;
            padding: 8px 6px;
            border-radius: 20px;
            display: inline-flex;
            max-width: 100%;
            justify-content: center;
            align-items: center;
          }
        `}</style> */}
      </div>
      <ProfileDetail userData={user_data} />
      <ConnectCategiries
        socialCircles={user_data?.social_circles}
        isProfile={true}
        extraClass="max-h-[480px] overflow-y-auto scrollbar-hidden"
      />
      <ConnectStory extraStyle="text-[24px]" />
      {user_data?.recent_posts.map((post) => {
        return (
          <div key={post.id} className="mb-5">
            <Feeds
              feed={post}
              handleExpandImage={handleExpandImage}
              handleShowMore={handleShowMore}
              showMore={showMore}
              handleComment={handleComment}
              showComment={showComment}
              feedId={feedId}
              socialCircles={socialCircles}
              signedInUser={user}
            />
          </div>
        );
      })}

      {expandImage && (
        <Modal isOpen={expandImage} onClose={handleExpandImage} size="max-w-xl">
          {' '}
          <img
            src={url}
            alt="Image"
            className="object-fill w-full text-black pr-1.5"
          />
        </Modal>
      )}
      {reportPost && (
        <ReportPostModal
          isOpen={reportPost}
          onClose={handleReportPost}
          feedId={feedId}
        />
      )}
      {confirmDelete && (
        <ConfirmAd
          isOpen={confirmDelete}
          onClose={() => {
            handleConfirmDelete();
          }}
          title={'Delete Post'}
          description={
            'Are you sure you want to delete this post? This action is irreversable'
          }
          onConfirm={handleDelete}
          confirmation={true}
          isLoading={isPending}
          error={errorDeleting}
        />
      )}
    </div>
  );
};

export default UserProfile;
