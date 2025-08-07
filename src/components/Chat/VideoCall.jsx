import { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { ImPhoneHangUp } from 'react-icons/im';

const VideoCall = ({ appId, channel, token, uid, handleEndCall }) => {
  const [client] = useState(() =>
    AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }),
  );
  const localContainer = useRef(null);
  const remoteContainer = useRef(null);

  useEffect(() => {
    let localTrack;

    const init = async () => {
      try {
        // Join the channel
        await client.join(appId, channel, token, uid);

        // Create and play local video track
        localTrack = await AgoraRTC.createCameraVideoTrack();
        localTrack.play(localContainer.current);

        // Publish local track
        await client.publish([localTrack]);

        // Handle remote user
        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            const remoteVideoTrack = user.videoTrack;
            if (remoteContainer.current && remoteVideoTrack) {
              remoteVideoTrack.play(remoteContainer.current);
            }
          }
        });
      } catch (err) {
        console.error('Failed to initialize Agora client:', err);
      }
    };

    init();

    return () => {
      localTrack?.close();
      client.leave();
    };
  }, [appId, channel, token, uid, client]);

  return (
    <div className="flex flex-col gap-6">
      {/* Local Video */}
      {/* <div
        ref={localContainer}
        className="relative w-full h-64 bg-black rounded-xl overflow-hidden shadow-lg"
      >
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
          Your Video
        </span>
      </div> */}

      {/* Remote Video */}
      <div
        ref={remoteContainer}
        className="relative w-full h-[386px] bg-zinc-800 rounded-xl overflow-hidden shadow-lg"
      >
        {/* <span className="absolute bottom-2 left-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
          Remote Video
        </span> */}
      </div>
      <button
        onClick={handleEndCall}
        className="text-white bg-[#A20030] hover:bg-[#870026] py-4 rounded-full mx-auto mt-5 size-16 flex items-center justify-center gap-x-2 cursor-pointer"
      >
        <ImPhoneHangUp className="w-10 h-5" />
      </button>
    </div>
  );
};

export default VideoCall;
