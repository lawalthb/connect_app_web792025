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

const ConnectionFeed = ({ data, profileImages, socialCircles }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [expandImage, setExpandImage] = useState(false);
  const [postStories, setPostStories] = useState(false);
  const [url, setUrl] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [feedId, setFeedId] = useState(null);
  const [reportPost, setReportPost] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    setUrl(url);
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
          <div className="w-[91px]">
            <FilterButton handleFilter={handleFilter} />
          </div>
        </div>
        <div className="w-full lg:w-[562px] mx-auto my-20">
          <ConnectStory handlePostStories={handlePostStories} />
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
            src={url}
            alt="Image"
            className="object-fill w-full text-black pr-1.5 max-h-[calc(100vh-150px)]"
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
    </div>
  );
};

export default ConnectionFeed;
