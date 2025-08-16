import { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { ImPhoneHangUp } from 'react-icons/im';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';

const VideoCall = ({
  appId,
  channel,
  token,
  uid,
  handleEndCall,
  callType,
  remoteUser,
}) => {
  const [client] = useState(() =>
    AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }),
  );

  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);
  const localContainer = useRef(null);
  const remoteContainer = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [callStatus, setCallStatus] = useState('Connecting...');

  useEffect(() => {
    let isMounted = true; // 👈 track mount state
    let localTrack;

    const init = async () => {
      try {
        await client.join(appId, channel, token, uid);

        if (!isMounted) return; // 👈 don’t continue if unmounted

        if (callType === 'audio') {
          localTrack = await AgoraRTC.createMicrophoneAudioTrack();
          if (!isMounted) {
            localTrack.close();
            return;
          }
          localAudioTrackRef.current = localTrack;
          await client.publish([localTrack]);
        } else {
          localTrack = await AgoraRTC.createCameraVideoTrack();
          if (!isMounted) {
            localTrack.close();
            return;
          }
          localVideoTrackRef.current = localTrack;
          if (localContainer.current) {
            localTrack.play(localContainer.current);
          }
          await client.publish([localTrack]);
        }

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === 'video' && remoteContainer.current) {
            user.videoTrack?.play(remoteContainer.current);
          }

          if (mediaType === 'audio') {
            user.audioTrack?.play();
            setCallStatus('Connected');
          }
        });

        client.on('user-unpublished', () => {
          setCallStatus('User left');
        });

        setCallStatus('Waiting for user...');
      } catch (err) {
        if (isMounted) {
          console.error('Failed to initialize Agora client:', err);
          setCallStatus('Connection failed');
        }
      }
    };

    init();

    return () => {
      isMounted = false;
      try {
        localTrack?.close();
        localAudioTrackRef.current?.close();
        localVideoTrackRef.current?.close();
        client.leave();
      } catch (e) {
        console.warn('Cleanup error:', e);
      }
    };
  }, [appId, channel, token, uid, client, callType]);

  const toggleMute = async () => {
    if (localAudioTrackRef.current) {
      if (isMuted) {
        await localAudioTrackRef.current.setEnabled(true);
      } else {
        await localAudioTrackRef.current.setEnabled(false);
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    setSpeakerOn((prev) => !prev);
    // On mobile, you could integrate with device audio routing
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      {/* Audio Call UI */}
      {callType === 'audio' ? (
        <div className="flex flex-col items-center justify-center text-center gap-6">
          {/* Remote User Avatar */}
          <div className="size-32 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center shadow-lg">
            {remoteUser?.profile_url ? (
              <img
                src={remoteUser.profile_url}
                alt={remoteUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-gray-700">
                {remoteUser?.name?.[0] || 'U'}
              </span>
            )}
          </div>

          {/* Remote User Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {remoteUser?.name || 'Unknown User'}
            </h2>
            <p className="text-gray-500 text-sm">{callStatus}</p>
          </div>

          {/* Controls */}
          <div className="flex gap-6 mt-6">
            {/* Mute */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md"
            >
              {isMuted ? (
                <FaMicrophoneSlash size={20} />
              ) : (
                <FaMicrophone size={20} />
              )}
            </button>

            {/* End Call */}
            <button
              type="button"
              onClick={handleEndCall}
              className="p-5 rounded-full bg-[#A20030] hover:bg-[#870026] text-white shadow-lg"
            >
              <ImPhoneHangUp size={22} />
            </button>

            {/* Speaker */}
            <button
              type="button"
              onClick={toggleSpeaker}
              className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md"
            >
              {speakerOn ? (
                <FaVolumeUp size={20} />
              ) : (
                <FaVolumeMute size={20} />
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Video Call UI */
        <div className="relative w-full h-[386px] bg-zinc-800 rounded-xl overflow-hidden shadow-lg">
          {/* Remote Video */}
          <div
            ref={remoteContainer}
            className="absolute inset-0 w-full h-full"
          />

          {/* Local Video (small preview) */}
          <div
            ref={localContainer}
            className="absolute bottom-4 right-4 w-32 h-40 rounded-lg overflow-hidden shadow-md border border-white"
          />
          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-[#A20030] hover:bg-[#870026] py-4 rounded-full size-16 flex items-center justify-center cursor-pointer shadow-lg"
          >
            <ImPhoneHangUp className="w-10 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
