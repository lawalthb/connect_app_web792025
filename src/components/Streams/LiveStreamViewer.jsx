import React, { useEffect, useRef, useState } from 'react';
import { Eye, Clock, User, Wifi, WifiOff, Users } from 'lucide-react';
import AgoraRTC from 'agora-rtc-sdk-ng';

export default function LiveStreamViewer({ streamData }) {
  const { agora_config, stream, viewer } = streamData.data;
  const { app_id, channel_name, token, agora_uid } = agora_config;

  const client = useRef(null);
  const videoRef = useRef(null);
  const remoteVideoTracks = useRef(new Map());
  const remoteAudioTracks = useRef(new Map());

  const [joined, setJoined] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [remoteUsers, setRemoteUsers] = useState([]);

  // Format duration helper
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 👉 Initialize Agora
  const initAgoraClient = async () => {
    try {
      setConnectionStatus('connecting');

      // Create client if not already created
      if (!client.current) {
        client.current = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
      }

      // Subscribe to remote users
      client.current.on('user-published', async (user, mediaType) => {
        await client.current.subscribe(user, mediaType);
        console.log('Subscribed to user:', user.uid, mediaType);

        if (mediaType === 'video') {
          const remoteTrack = user.videoTrack;
          remoteVideoTracks.current.set(user.uid, remoteTrack);
          setRemoteUsers((prev) => [...prev, user]);

          // Play video in container
          if (videoRef.current) {
            remoteTrack.play(videoRef.current);
          }
        }

        if (mediaType === 'audio') {
          const remoteTrack = user.audioTrack;
          remoteAudioTracks.current.set(user.uid, remoteTrack);
          remoteTrack.play(); // plays audio automatically
        }
      });

      client.current.on('user-unpublished', (user, mediaType) => {
        console.log('User unpublished:', user.uid, mediaType);
        if (mediaType === 'video') {
          remoteVideoTracks.current.delete(user.uid);
        }
        if (mediaType === 'audio') {
          remoteAudioTracks.current.delete(user.uid);
        }
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
      });

      client.current.on('user-left', (user) => {
        console.log('User left:', user.uid);
        remoteVideoTracks.current.delete(user.uid);
        remoteAudioTracks.current.delete(user.uid);
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
      });

      // Join the channel
      await client.current.join(app_id, channel_name, token, agora_uid);

      setJoined(true);
      setConnectionStatus('connected');
      console.log('Joined Agora channel successfully');
    } catch (error) {
      console.error('Agora init error:', error);
      setConnectionStatus('disconnected');
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        setConnectionStatus('connecting');

        if (!client.current) {
          client.current = AgoraRTC.createClient({
            mode: 'live',
            codec: 'vp8',
          });
        }

        client.current.on('user-published', async (user, mediaType) => {
          if (!isMounted) return; // 👈 prevent actions after unmount
          await client.current.subscribe(user, mediaType);
          console.log('Subscribed to user:', user.uid, mediaType);

          if (mediaType === 'video') {
            const remoteTrack = user.videoTrack;
            remoteVideoTracks.current.set(user.uid, remoteTrack);
            setRemoteUsers((prev) => [...prev, user]);

            if (videoRef.current) {
              remoteTrack.play(videoRef.current);
            }
          }

          if (mediaType === 'audio') {
            const remoteTrack = user.audioTrack;
            remoteAudioTracks.current.set(user.uid, remoteTrack);
            remoteTrack.play();
          }
        });

        await client.current.join(app_id, channel_name, token, agora_uid);

        if (isMounted) {
          setJoined(true);
          setConnectionStatus('connected');
          console.log('Joined Agora channel successfully');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Agora init error:', error);
          setConnectionStatus('disconnected');
        }
      }
    };

    init();

    return () => {
      isMounted = false; // 👈 stops any async continuation

      const cleanup = async () => {
        try {
          remoteVideoTracks.current.forEach((track) => track.stop());
          remoteAudioTracks.current.forEach((track) => track.stop());
          remoteVideoTracks.current.clear();
          remoteAudioTracks.current.clear();

          if (client.current) {
            await client.current.leave();
            client.current.removeAllListeners();
            console.log('Left Agora channel & cleaned up');
          }
        } catch (err) {
          console.error('Cleanup error:', err);
        } finally {
          setJoined(false);
          setConnectionStatus('disconnected');
          setRemoteUsers([]);
          client.current = null;
        }
      };

      cleanup();
    };
  }, [app_id, channel_name, token, agora_uid]);

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-400" />;
      case 'connecting':
        return <Wifi className="w-4 h-4 text-yellow-400 animate-pulse" />;
      default:
        return <WifiOff className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-[#E6BAC7] text-white rounded-xl overflow-hidden shadow-2xl">
      {/* Header Section */}
      <div className="relative">
        {stream.banner_image_url && (
          <div className="h-32 bg-gradient-to-r from-[#A20030] to-[#E6BAC7] relative overflow-hidden">
            <img
              src={stream.banner_image_url}
              alt="Stream banner"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        {/* Live Indicator */}
        {stream.is_live && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>
        )}

        {/* Connection Status */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
      </div>

      {/* Stream Info Header */}
      <div className="p-6 border-b border-[#A20030]">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{stream.title}</h1>
            <p className="text-gray-500 mb-4">{stream.description}</p>

            {/* Streamer Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A20030] to-[#E6BAC7] rounded-full flex items-center justify-center">
                {stream.streamer.profile_picture ? (
                  <img
                    src={stream.streamer.profile_picture}
                    alt={stream.streamer.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold">{stream.streamer.name}</p>
                <p className="text-sm text-gray-500">
                  @{stream.streamer.username}
                </p>
              </div>
            </div>
          </div>

          {/* Stream Stats */}
          <div className="text-right space-y-2">
            <div className="flex items-center space-x-2 text-lg">
              <Eye className="w-5 h-5 text-[#A20030]" />
              <span className="font-semibold text-gray-500">
                {stream.current_viewers.toLocaleString()}
              </span>
              <span className="text-gray-500">watching</span>
            </div>

            {/* {stream.is_live && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Live for {formatDuration(stream.duration)}</span>
              </div>
            )} */}

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Max: {stream.max_viewers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="p-6">
        <div
          className="relative bg-black rounded-lg overflow-hidden"
          style={{ aspectRatio: '16/9' }}
        >
          <div
            ref={videoRef}
            className="w-full h-full flex items-center justify-center"
          >
            {!joined ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin w-8 h-8 border-4 border-[#A20030] border-t-transparent rounded-full"></div>
                <p className="text-gray-300">Connecting to stream...</p>
                <p className="text-sm text-gray-500">Channel: {channel_name}</p>
              </div>
            ) : null}
          </div>

          {/* Video Overlay Controls */}
          {joined && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">LIVE</span>
              </div>

              {/* <div className="bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <span className="text-sm">
                  {stream.current_viewers} viewers
                </span>
              </div> */}
            </div>
          )}
        </div>
      </div>

      {/* Stream Details Footer */}
      <div className="px-6 pb-6">
        <div className="bg-[#A20030] rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Started:</span>
              <p className="font-semibold">{formatDate(stream.started_at)}</p>
            </div>

            <div>
              <span className="text-gray-400">Status:</span>
              <p className="font-semibold capitalize flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    stream.status === 'live' ? 'bg-green-400' : 'bg-gray-400'
                  }`}
                ></span>
                <span>{stream.status}</span>
              </p>
            </div>

            <div>
              <span className="text-gray-400">You joined:</span>
              <p className="font-semibold">{formatDate(viewer.joined_at)}</p>
            </div>
          </div>

          {stream.is_paid && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Stream Price:</span>
                <span className="font-bold text-green-400">
                  ${stream.price} {stream.currency}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
