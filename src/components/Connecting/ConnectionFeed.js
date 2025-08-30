import { useEffect, useState } from 'react';
import ConnectStory from './ConnectStory';
import FilterButton from '../FilterButton';
import Daniella from '@/Images/Daniella.png';
import Modal from '../Modal';
import SearchField from '../Input/SearchField';
import Feeds from './Feeds';
import PostStories from './PostStories';
import ReportPostModal from './ReportPostModal';
import ConfirmAd from '../Advert/ConfirmAd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../Utils/api';
import useUserStore from '@/zustandStore/useUserStore';
import LikeShareComment from './LikeShareComment';
import StoryViewer from './StoryViewer';
import { mapStories } from '../Utils/mapStories';

const ConnectionFeed = ({
  data,
  profileImages,
  socialCircles,
  token,
  myStoryData,
  otherStoryData,
}) => {
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
  const [filteredFeed, setFilteredFeed] = useState([]);

  useEffect(() => {
    setFilteredFeed(data?.data);
  }, []);

  const { user, loading } = useUserStore();

  const queryClient = useQueryClient();

  const myStoriesData = myStoryData ? mapStories(myStoryData?.data) : [];
  const storiesOtherData = otherStoryData
    ? mapStories(otherStoryData?.data)
    : [];

  const storiesData = [...myStoriesData, ...storiesOtherData];

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id }) => deletePost(id),
    onSuccess: () => {
      setFeedId(null);
      handleConfirmDelete();
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onError: (err) => {
      console.error('Delete failed:', err.message);
    },
  });

  const openStory = (storyIndex) => {
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

  const handleSearch = (e) => {
    const userName = e.target.value;
    if (!userName) {
      setFilteredFeed(data?.data);
      return;
    }

    const result = data?.data?.filter((feed) =>
      feed?.user?.name?.toLowerCase().includes(userName.toLowerCase()),
    );

    setFilteredFeed(result);
  };
  return (
    <div className="md:px-20 w-full mb-20">
      <>
        <div className="flex items-center justify-center gap-3">
          <div className="w-[384px]">
            <SearchField onChange={handleSearch} />
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
                index={index}
              />
            ))}
            {storiesData.length < 1 && (
              <ConnectStory
                // key={story.id}
                // story={story}
                handlePostStories={handlePostStories}
                // handleViewStories={() => openStory(index)}
                connectFeedPage={true}
                // index={index}
              />
            )}
          </div>
          {filteredFeed.length > 0 ? (
            <div>
              {filteredFeed?.map((feed) => {
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
          ) : (
            <div className="font-semibold text-base text-gray-600 text-center">
              <h3>No Feed Available</h3>
            </div>
          )}
        </div>
      </>
      {postStories && (
        <PostStories
          onClose={handlePostStories}
          show={postStories}
          profileImages={profileImages}
          token={token}
        />
      )}

      {expandImage && (
        <Modal isOpen={expandImage} onClose={handleExpandImage} size="max-w-xl">
          <img
            src={feedData?.media?.[0]?.file_url}
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
