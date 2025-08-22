import { useEffect, useRef, useState } from 'react';
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

    const duration = currentStory?.duration;
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
    currentStory?.duration,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Story Container */}
      <div
        style={{ height: 'calc(100vh - 10rem)' }}
        className="relative w-full max-w-sm mx-auto h-full bg-black overflow-hidden"
      >
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
                {formatTime(currentStory?.timestamp)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentStory?.type === 'video' && (
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
          {currentStory?.type === 'image' ? (
            <img
              src={currentStory?.url}
              alt="Story"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentStory?.url}
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

export default StoryViewer;
