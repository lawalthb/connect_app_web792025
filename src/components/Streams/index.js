import { useState } from 'react';
import StreamCard from './StreamCard';
import UpcomingLiveStreamCard from './UpcomingLiveStreamCard';
import VideoPlayer from '../VideoPlayer';
import Daniella from '@/Images/Daniella.png';
import ConfirmIcon from '@/Images/Icons/ConfirmIcon.svg';
import Button from '../Button';
import { AiOutlineLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import Comments from '../Comments';
import BackToPreviousScreen from '../BackToPreviousScreen';
import { streamData } from '../Utils/methods';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getLatestLivestream,
  getStreamComments,
  postStreamComment,
  viewStream,
} from '../Utils/api';
import Loader from '../Loader/Loader';
import dynamic from 'next/dynamic';

const LiveStreamViewer = dynamic(() => import('./LiveStreamViewer'), {
  ssr: false,
});

const Stream = () => {
  const [watchStream, setWatchStream] = useState(false);
  const [availableStream, setAvailableStream] = useState(false);
  const [liveStreamData, setStreamLiveStreamData] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const [viewerComment, setViewerComment] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingLatestLivestream } = useQuery({
    queryKey: ['latestLivestream'],
    queryFn: getLatestLivestream,
  });

  const { data: comments, isLoading } = useQuery({
    queryKey: ['streamComments'],
    queryFn: () => getStreamComments(streamId),
    enabled: !!streamId,
  });

  const { mutate: viewerCommentMutation, isPending: isCommenting } =
    useMutation({
      mutationFn: ({ data, id }) => postStreamComment(data, id),
      onSuccess: () => {
        setViewerComment('');
        queryClient.invalidateQueries({ queryKey: ['streamComments'] });
      },
      onError: (err) => {
        console.error('Commenting failed:', err.message);
      },
    });

  const {
    mutate,
    isPending: isLoadingLiveStreamData,
    error: errorViewingStream,
  } = useMutation({
    mutationFn: ({ id }) => viewStream(id),
    onSuccess: (data) => {
      setStreamLiveStreamData(data);
      setAvailableStream(true);
    },
    onError: (err) => {
      console.error('Stream failed:', err.message);
    },
  });

  const {
    mutate: leaveStreamMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id }) => viewStream(id),
    onSuccess: () => {
      handleBackToHomePage();
    },
    onError: (err) => {
      console.error('Stream failed:', err.message);
    },
  });

  const handleWatchStream = () => {
    setWatchStream((prev) => !prev);
  };

  const handleViewerComment = (e) => {
    setViewerComment(e.target.value);
  };
  const handleViewMore = (id) => {
    if (id === 1) {
      handleWatchStream();
    } else if (id === 2) {
      console.log(id);
    }
  };
  const handleJoinStream = (id) => {
    setStreamId(id);
    mutate({ id });
  };

  const handleBackToHomePage = () => {
    setWatchStream(false);
    setAvailableStream(false);
  };

  const hanldeLeaveStream = () => {
    leaveStreamMutation({ id: streamId });
  };

  const sendViewerComment = () => {
    if (viewerComment === '') return;
    const payload = {
      message: viewerComment,
    };
    viewerCommentMutation({ data: payload, id: streamId });
  };

  if (
    isLoadingLatestLivestream ||
    isLoadingLiveStreamData ||
    isPending ||
    isLoading
  )
    return <Loader />;
  return (
    <>
      {!watchStream && !availableStream && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {streamData.map((option) => (
            <div key={option.id}>
              <StreamCard option={option} handleViewMore={handleViewMore} />
            </div>
          ))}
        </div>
      )}
      {watchStream && !availableStream && (
        <div className="flex flex-col -mt-20 w-full">
          <h3 className="text-[#A20030] font-bold text-[40px] leading-16 text-center mb-24">
            Upcoming Live Stream
          </h3>
          <div className="mx-20 mb-10">
            <BackToPreviousScreen onBackClick={handleBackToHomePage} />
          </div>
          <>
            {data?.data.streams?.map((option) => (
              <div key={option.id}>
                <UpcomingLiveStreamCard
                  option={option}
                  handleJoinStream={handleJoinStream}
                />
              </div>
            ))}
          </>
        </div>
      )}
      {availableStream && (
        <div className="flex flex-col mx-auto px-10 lg:px-5 w-full lg:w-[966px] justify-center -mt-20">
          <h2 className="text-[#0B0D0E] text-center font-bold text-[48px] leading-16">
            Available Live Stream
          </h2>
          <div className="w-full h-full mt-14">
            {/* <VideoPlayer src={'https://www.youtube.com/embed/qobh9QeMbl8'} /> */}
            {liveStreamData && <LiveStreamViewer streamData={liveStreamData} />}
          </div>
          <div>
            <h3 className="text-[#0F0F0F] font-semibold text-[18px] leading-7 mt-24">
              {liveStreamData?.data?.stream?.title}
            </h3>
            <div className="flex flex-col gap-y-4 lg:flex-row justify-between lg:items-center">
              <div className="mt-3 flex gap-3">
                <img
                  src={liveStreamData?.data?.stream?.streamer?.profile_picture}
                  alt={liveStreamData?.data?.stream?.streamer?.name}
                  className="object-fill size-10 text-black rounded-full"
                />
                <h3 className="text-[#0F0F0F] text-base leading-[22px] font-medium">
                  {liveStreamData?.data?.stream?.streamer?.name}
                </h3>
                <ConfirmIcon />
                <div className="flex gap-3 ml-5">
                  <Button
                    label="Joined"
                    variant="outlined"
                    btnstyle={'rounded'}
                  />
                  <Button
                    label="Leave"
                    btnstyle={'rounded'}
                    onClick={hanldeLeaveStream}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#0000000D] rounded-tl-[18px] rounded-bl-[18px] p-2 w-[88.7px] flex items-center gap-3">
                  <AiOutlineLike className="text-[#0F0F0F] w-[18px] h-[17px] cursor-pointer" />
                  <p className="text-[#0F0F0F] text-[14px] font-medium">205k</p>
                </div>
                <div className="bg-[#0000000D] border-l-2 border-[#0000001A] rounded-tr-[18px] rounded-br-[18px] p-2.5 w-[52px]">
                  <BiDislike className="text-[#0F0F0F] w-[18px] h-[17px] cursor-pointer" />
                </div>
                <div className="cursor-pointer bg-[#0000000D] border-l-2 border-[#0000001A] rounded-[18px] p-2 flex items-center gap-3 ml-2">
                  <RiShareForwardLine className="text-[#0F0F0F] w-[18px] h-[17px]" />
                  <p className="text-[#0F0F0F] text-[14px] font-medium">
                    Share
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#0000000D] border-[#0000001A] rounded-[12px] p-2 mt-3">
              <p className="text-[#0F0F0F] text-[14px] font-medium">
                {`${liveStreamData?.data?.stream?.current_viewers.toLocaleString()} viewers online`}
              </p>
            </div>
          </div>
          <div className="mt-14">
            <Comments
              comments={comments}
              viewerComment={viewerComment}
              handleViewerComment={handleViewerComment}
              sendViewerComment={sendViewerComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Stream;
