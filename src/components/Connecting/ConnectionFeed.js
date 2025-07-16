import { useState } from 'react';
import ConnectStory from './ConnectStory';
import FilterButton from '../FilterButton';
import Daniella from '@/Images/Daniella.png';
import Modal from '../Modal';
import SearchField from '../Input/SearchField';
import Feeds from './Feeds';

const ConnectionFeed = ({ data }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [expandImage, setExpandImage] = useState(false);
  const [url, setUrl] = useState('');

  console.log(data, 'data');

  const handleShowMore = (identifier) => {
    if (identifier === 'post') {
      console.log(identifier);
    } else if (identifier === 'delete') {
      console.log(identifier);
    }
    setShowMore((prev) => !prev);
  };

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const handleExpandImage = (url) => {
    setUrl(url);
    setExpandImage((prev) => !prev);
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
          <ConnectStory />
          <div>
            {data.data.map((feed) => {
              return (
                <div key={feed.id}>
                  <Feeds
                    feed={feed}
                    handleExpandImage={handleExpandImage}
                    handleShowMore={handleShowMore}
                    showMore={showMore}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>

      {expandImage && (
        <Modal isOpen={expandImage} onClose={handleExpandImage} size="max-w-xl">
          <img
            src={url}
            alt="Image"
            className="object-fill w-full text-black pr-1.5 max-h-[calc(100vh-150px)]"
          />
        </Modal>
      )}
    </div>
  );
};

export default ConnectionFeed;
