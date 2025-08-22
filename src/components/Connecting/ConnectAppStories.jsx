import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  MoreHorizontal,
  Volume2,
  VolumeX,
} from 'lucide-react';

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

const StoryViewer = ({
  story,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showReactionInput, setShowReactionInput] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const currentStory = story.stories[currentStoryIndex];
  const totalStories = story.stories.length;

  useEffect(() => {
    if (isPaused) return;

    const duration = currentStory.duration;
    const interval = 50; // Update every 50ms for smooth progress
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex < totalStories - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            return 0;
          } else {
            onNext();
            return 0;
          }
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [
    currentStoryIndex,
    isPaused,
    currentStory.duration,
    onNext,
    totalStories,
  ]);

  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex]);

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      onPrevious();
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onNext();
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Container */}
      <div className="relative w-full max-w-sm mx-auto h-full bg-black overflow-hidden">
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 z-20 flex space-x-1">
          {story.stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    index < currentStoryIndex
                      ? '100%'
                      : index === currentStoryIndex
                        ? `${progress}%`
                        : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={story.user.avatar}
              alt={story.user.name}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-white font-medium text-sm">
                {story.user.name}
              </p>
              <p className="text-white/70 text-xs">
                {formatTime(currentStory.timestamp)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentStory.type === 'video' && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/30 text-white"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/30 text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="relative w-full h-full">
          {currentStory.type === 'image' ? (
            <img
              src={currentStory.url}
              alt="Story"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentStory.url}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              onLoadedData={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                }
              }}
            />
          )}

          {/* Touch Areas for Navigation */}
          <div className="absolute inset-0 flex">
            <button
              className="flex-1 focus:outline-none"
              onClick={handlePrevStory}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />
            <button
              className="flex-1 focus:outline-none"
              onClick={handleNextStory}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          {!story.user.isOwn && (
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Reply to story..."
                  className="w-full px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white 
                           placeholder-white/70 border border-white/20 focus:outline-none focus:border-white/40"
                  onFocus={() => setShowReactionInput(true)}
                />
              </div>
              <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white">
                <Send size={20} />
              </button>
            </div>
          )}

          {story.user.isOwn && (
            <div className="text-center">
              <p className="text-white/70 text-sm">
                👁 {currentStory.views} views
              </p>
            </div>
          )}
        </div>

        {/* Navigation Arrows (Desktop) */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full 
                     bg-black/30 backdrop-blur-sm text-white opacity-0 md:opacity-100 
                     transition-opacity hover:bg-black/50"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full 
                     bg-black/30 backdrop-blur-sm text-white opacity-0 md:opacity-100 
                     transition-opacity hover:bg-black/50"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

const StoryRing = ({ story, onClick, hasUnseenStories = false }) => {
  const ringColor = story.user.isOwn
    ? 'from-blue-500 to-blue-600'
    : hasUnseenStories
      ? 'from-green-400 to-green-600'
      : 'from-gray-400 to-gray-500';

  return (
    <div
      className="flex flex-col items-center space-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`w-16 h-16 rounded-full bg-gradient-to-tr ${ringColor} p-0.5`}
      >
        <div className="w-full h-full rounded-full bg-white p-0.5">
          <img
            src={story.user.avatar}
            alt={story.user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs text-gray-700 text-center max-w-[4rem] truncate">
        {story.user.isOwn ? 'Your Story' : story.user.name}
      </p>
    </div>
  );
};

export default function ConnectAppStories() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">Status</h1>
        </div>
      </div>

      {/* Stories Section */}
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            Recent updates
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {storiesData.map((story, index) => (
              <StoryRing
                key={story.id}
                story={story}
                onClick={() => openStory(index)}
                hasUnseenStories={!story.user.isOwn && Math.random() > 0.5} // Random for demo
              />
            ))}
          </div>
        </div>

        {/* Muted Updates */}
        <div className="mt-8">
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            Muted updates
          </h2>
          <p className="text-gray-400 text-sm text-center py-8">
            Updates from muted contacts will appear here
          </p>
        </div>
      </div>

      {/* Story Viewer */}
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
}
