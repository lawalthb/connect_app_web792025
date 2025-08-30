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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getUser } from '../Utils/api';
import Loader from '../Loader/Loader';
import useUserStore from '@/zustandStore/useUserStore';
import ReportPostModal from './ReportPostModal';
import ConfirmAd from '../Advert/ConfirmAd';
import StoryViewer from './StoryViewer';
import PostStories from './PostStories';
import { mapStories } from '../Utils/mapStories';

const storiesData = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Your Story',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      isOwn: true,
    },
    stories: [
      {
        id: 1,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
        duration: 5000,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        views: 24,
      },
      {
        id: 2,
        type: 'video',
        url: 'https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420',
        duration: 15000,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        views: 18,
      },
    ],
  },
  {
    id: 2,
    user: {
      id: 2,
      name: 'Alice Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b5b35c5a?w=150&h=150&fit=crop&crop=face',
      isOwn: false,
    },
    stories: [
      {
        id: 3,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=1200&fit=crop',
        duration: 5000,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        views: 45,
      },
    ],
  },
  {
    id: 3,
    user: {
      id: 3,
      name: 'Bob Wilson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOwn: false,
    },
    stories: [
      {
        id: 4,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=800&h=1200&fit=crop',
        duration: 5000,
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        views: 32,
      },
      {
        id: 5,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop',
        duration: 5000,
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        views: 28,
      },
    ],
  },
  {
    id: 4,
    user: {
      id: 4,
      name: 'Emma Davis',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOwn: false,
    },
    stories: [
      {
        id: 6,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop',
        duration: 5000,
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        views: 67,
      },
    ],
  },
];

const UserProfile = ({
  userData,
  socialCircles,
  myStoryData,
  otherStoryData,
  token,
}) => {
  const [expandImage, setExpandImage] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [feedId, setFeedId] = useState(false);
  const [url, setUrl] = useState('');
  const [reportPost, setReportPost] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [postStories, setPostStories] = useState(false);

  const { user, loading } = useUserStore();

  const myStoriesData = myStoryData ? mapStories(myStoryData?.data) : [];
  const storiesOtherData = otherStoryData
    ? mapStories(otherStoryData?.data)
    : [];

  const storiesData = [...myStoriesData, ...storiesOtherData];

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
    onError: (err) => {
      console.error('Delete failed:', err.message);
    },
  });

  const openStory = (storyIndex) => {
    console.log('Opening story at index:', storyIndex);
    setSelectedStory(storiesData[storyIndex]);
    setCurrentStoryIndex(storyIndex);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  const nextStory = () => {
    if (currentStoryIndex < storiesData.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(nextIndex);
      setSelectedStory(storiesData[nextIndex]);
    } else {
      closeStory();
    }
  };

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(prevIndex);
      setSelectedStory(storiesData[prevIndex]);
    }
  };

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

  const handlePostStories = () => {
    setPostStories((prev) => !prev);
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
      <div className="flex gap-4">
        {storiesData.map((story, index) => (
          <ConnectStory
            key={story.id}
            story={story}
            handlePostStories={handlePostStories}
            handleViewStories={() => openStory(index)}
            connectFeedPage={true}
            index={index}
          />
        ))}
      </div>
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
      {postStories && (
        <PostStories
          onClose={handlePostStories}
          show={postStories}
          profileImages={profileImages}
          token={token}
        />
      )}
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={closeStory}
          onNext={nextStory}
          onPrevious={previousStory}
          hasNext={currentStoryIndex < storiesData.length - 1}
          hasPrevious={currentStoryIndex > 0}
        />
      )}
    </div>
  );
};

export default UserProfile;
