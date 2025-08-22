import { useState } from 'react';
import ConnectStory from './ConnectStory';
import FilterButton from '../FilterButton';
import Daniella from '@/Images/Daniella.png';
import Modal from '../Modal';
import SearchField from '../Input/SearchField';
import Feeds from './Feeds';
import PostStories from './PostStories';
import ReportPostModal from './ReportPostModal';
import ConfirmAd from '../Advert/ConfirmAd';
import { useMutation } from '@tanstack/react-query';
import { deletePost } from '../Utils/api';
import useUserStore from '@/zustandStore/useUserStore';
import LikeShareComment from './LikeShareComment';
import StoryViewer from './StoryViewer';

// Mock data for stories
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

const ConnectionFeed = ({ data, profileImages, socialCircles }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [expandImage, setExpandImage] = useState(false);
  const [postStories, setPostStories] = useState(false);
  const [feedData, setFeedData] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [feedId, setFeedId] = useState(null);
  const [reportPost, setReportPost] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const { user, loading } = useUserStore();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id }) => deletePost(id),
    onSuccess: () => {
      setFeedId(null);
      handleConfirmDelete();
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

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const handleReportPost = () => {
    setReportPost((prev) => !prev);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleComment = (id) => {
    setFeedId(id);
    setShowComment((prev) => !prev);
  };

  const handleExpandImage = (url) => {
    setFeedData(url);
    setExpandImage((prev) => !prev);
  };

  const handlePostStories = () => {
    setPostStories((prev) => !prev);
  };

  const handleDelete = () => {
    mutate({ id: feedId });
  };

  return (
    <div className="md:px-20 w-full mb-20">
      <>
        <div className="flex items-center justify-center gap-3">
          <div className="w-[384px]">
            <SearchField />
          </div>
          {/* <div className="w-[91px]">
            <FilterButton handleFilter={handleFilter} />
          </div> */}
        </div>
        <div className="w-full lg:w-[562px] mx-auto my-20">
          <h3 className={`text-black font-medium leading-6 text-[16px]`}>
            Connect Story
          </h3>
          <div className="flex gap-4">
            {storiesData.map((story, index) => (
              <ConnectStory
                key={story.id}
                story={story}
                handlePostStories={handlePostStories}
                handleViewStories={() => openStory(index)}
                connectFeedPage={true}
              />
            ))}
          </div>
          <div>
            {data?.data.map((feed) => {
              return (
                <div key={feed.id} className="mb-5">
                  <Feeds
                    feed={feed}
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
          </div>
        </div>
      </>
      {postStories && (
        <PostStories
          onClose={handlePostStories}
          show={postStories}
          profileImages={profileImages}
        />
      )}

      {expandImage && (
        <Modal isOpen={expandImage} onClose={handleExpandImage} size="max-w-xl">
          <img
            src={feedData?.user?.profile_url}
            alt="Image"
            className="object-fill w-full text-black pr-1.5 max-h-[calc(100vh-150px)]"
          />
          <LikeShareComment
            feed={feedData}
            handleComment={handleComment}
            showComment={showComment}
            handleShowMore={handleShowMore}
            feedId={feedId}
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
          error={error}
        />
      )}
      {/* {viewStories && <ConnectAppStories />} */}
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

export default ConnectionFeed;
